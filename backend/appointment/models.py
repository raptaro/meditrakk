from datetime import timedelta
from django.utils import timezone
from django.db import models
from patient.models import Patient
from user.models import Doctor

HOLD_MINUTES = 10 
from django.conf import settings
class Appointment(models.Model):
    STATUS = (
        ('PendingPayment', 'Pending Payment'),
        ('Scheduled', 'Scheduled'),
        ('Waiting', 'Waiting'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    )
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    scheduled_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,        # allow null values
        blank=True,       # allow empty forms
        related_name='scheduled_appointments'
    )
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS, default='PendingPayment')
    notes = models.TextField(max_length=250, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    #downpayment = 
    class Meta:
        ordering = ['appointment_date']
        constraints = [
            models.UniqueConstraint(
                fields=['doctor', 'appointment_date'],
                name='unique_appointment_per_doctor_and_slot'
            )
        ]

    def __str__(self):
        return f"Appointment {self.id} on {self.appointment_date} with {self.scheduled_by} for {self.patient}"

class AppointmentRequest(models.Model):
    # appointment request should go here first
    STATUS = [
        ('pending_payment', 'Pending Payment'),
        ('paid', 'Paid (awaiting reservation finalization)'),
        ('reserved', 'Reserved (paid, awaiting secretary confirmation)'),
        ('paid_unavailable', 'Paid - Slot Unavailable'),
        ('expired', 'Expired'),
        ('cancelled', 'Cancelled'),
        ('scheduled', 'Scheduled'),
    ]
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointment_requests')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointment_requests')
    requested_datetime = models.DateTimeField(db_index=True)
    reason = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=30, choices=STATUS, default='pending_payment')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def mark_paid(self):
        """Mark request as paid (called after Payment is confirmed)."""
        self.status = 'paid'
        self.save(update_fields=['status', 'updated_at'])

    def __str__(self):
        return f"Request #{self.pk} — {self.patient} -> {self.doctor} @ {self.requested_datetime}"
    
class AppointmentReservation(models.Model):
    appointment_request = models.OneToOneField(
        AppointmentRequest,
        on_delete=models.CASCADE,
        related_name='reservation'
    )
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='reservations')
    appointment_datetime = models.DateTimeField(db_index=True)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['doctor', 'appointment_datetime'],
                name='unique_reserved_slot_per_doctor'
            )
        ]
        ordering = ['expires_at']
    
    def is_expired(self):
        return timezone.now() >= self.expires_at
    
    @classmethod
    def create_for_request(cls, appointment_request):
        expires = timezone.now() + timedelta(minutes=HOLD_MINUTES)
        return cls.objects.create(
            appointment_request=appointment_request,
            doctor=appointment_request.doctor,
            appointment_datetime=appointment_request.requested_datetime,
            expires_at=expires
        )

    def seconds_until_expiry(self):
        delta = self.expires_at - timezone.now()
        return max(0, int(delta.total_seconds()))

    def __str__(self):
        return f"Reservation #{self.pk} — {self.doctor} @ {self.appointment_datetime} (expires {self.expires_at})"


class Payment(models.Model):
    """
    Payment record. It may be linked to either an AppointmentRequest (most common for downpayments)
    or directly to an Appointment (if you reuse the payment model for other flows).
    """
    PAYMENT_METHODS = (
        ('PayMaya', 'PayMaya'),
        ('Gcash', 'Gcash'),
    )

    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Paid', 'Paid'),
        ('Failed', 'Failed'),
    )

    # link to either the request (pre-confirmation) or the final appointment (post-confirmation).
    appointment = models.OneToOneField(
        Appointment,
        on_delete=models.CASCADE,
        related_name='payment',
        null=True,
        blank=True
    )
    appointment_request = models.OneToOneField(
        AppointmentRequest,
        on_delete=models.CASCADE,
        related_name='payment',
        null=True,
        blank=True
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='payments')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')

    # provider-specific fields (example: PayMaya)
    paymaya_reference_id = models.CharField(max_length=200, blank=True, null=True)
    paymaya_checkout_url = models.URLField(blank=True, null=True)
    paymaya_response = models.JSONField(blank=True, null=True)

    # manual-proof (GCash) support
    gcash_proof = models.ImageField(upload_to='gcash_proofs/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def mark_paid(self):
        self.status = 'Paid'
        self.save(update_fields=['status', 'updated_at'])

    def __str__(self):
        target = f"Request({self.appointment_request_id})" if self.appointment_request_id else f"Appt({self.appointment_id})"
        return f"Payment #{self.pk} — {target} — {self.payment_method} — {self.status}"
    

class AppointmentReferral(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Secretary Review'),
        ('scheduled', 'Appointment Scheduled'),
        ('completed', 'Referral Completed'),
        ('canceled', 'Canceled'),
    ]
    
    referring_doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='referrals_made',
        on_delete=models.CASCADE
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='referrals')
    receiving_doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='referrals_received',
        on_delete=models.CASCADE,
        null=True, blank=True  # Receiving doctor may be assigned later by the secretary
    )
    reason = models.TextField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    appointment = models.OneToOneField(Appointment, null=True, blank=True, on_delete=models.SET_NULL)
    
    def __str__(self):
        return f"Referral from {self.referring_doctor} to {self.receiving_doctor or 'Unassigned'} for {self.patient}"