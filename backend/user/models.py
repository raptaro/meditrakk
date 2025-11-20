import re
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
import random
import string
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.text import slugify
from django.db.models import Max
class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        return self.create_user(email, password, **kwargs)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(unique=True, primary_key=True, editable=False, max_length=64)
    ROLE_CHOICES = [
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('on-call-doctor', 'Oncall-Doctor'),
        ('secretary', 'Medical Secretary'),
        ('admin', 'Admin'),
    ]
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='doctor')
    date_joined = models.DateTimeField(auto_now_add=True,  blank=True, null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
@receiver(pre_save, sender=UserAccount)
def create_user_id(sender, instance, **kwargs):
    if not instance.id:
        prefix = "02000"
        
        # Use timestamp + random to ensure uniqueness
        import time
        import random
        
        timestamp = int(time.time() * 1000)  # Current time in milliseconds
        random_part = random.randint(0, 9999)
        
        # Combine and convert to hex
        unique_num = (timestamp + random_part) % 0xFFFFF  # Limit to 5 hex digits max
        
        # Create the new ID
        from django.utils.text import slugify
        last_name_slug = slugify(instance.last_name) or "user"
        
        # Convert to hex (lowercase)
        unique_hex = format(unique_num, 'x')
        
        instance.id = f"{last_name_slug}-{prefix}{unique_hex}"
# @receiver(pre_save, sender=UserAccount)
# def create_user_id(sender, instance, **kwargs):
#     if not instance.id:
#         prefix = "02000"
#         start_num = 10
        
#         # Get the highest ID by creation date or primary key
#         last_user = UserAccount.objects.order_by('-pk').first()
        
#         if last_user and last_user.pk:
#             # Use the primary key to determine next number
#             # This assumes primary keys are sequential
#             next_num = last_user.pk + start_num
#         else:
#             next_num = start_num

#         # Create the new ID - Ensure everything is string
#         from django.utils.text import slugify
#         last_name_slug = slugify(instance.last_name) or "user"
#         prefix_str = str(prefix)
#         next_num_str = str(next_num)
        
#         instance.id = f"{last_name_slug}-{prefix_str}{next_num_str}"
        
class BaseProfile(models.Model):
    role_id = models.CharField(max_length=50, null=True, editable=False)

    user = models.OneToOneField(
        UserAccount,
        on_delete=models.CASCADE,
        related_name="%(class)s_profile",  # doctor_profile, patient_profile, etc.
    )

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        # Always sync role_id with the user.id
        if self.user:
            self.role_id = self.user.id
        super().save(*args, **kwargs)
                
class Doctor(BaseProfile):
    timezone = models.CharField(max_length=50, default='UTC')

    specialization = models.CharField(max_length=255)
    # license_number = models.CharField(max_length=255)
    # years_of_experience = models.IntegerField(default=0)
    # bio = models.TextField(blank=True)
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.specialization}"
class Secretary(BaseProfile):
    department = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Secretary: {self.user.get_full_name()}"

class Admin(BaseProfile):
    office = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Admin: {self.user.get_full_name()}"
class Schedule(models.Model):
    DAYS_OF_WEEK = [
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ]

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name='schedule'
    )
    day_of_week = models.CharField(max_length=10, choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        unique_together = ('doctor', 'day_of_week', 'start_time', 'end_time')

    def __str__(self):
        return f"{self.doctor.user.get_full_name()} - {self.day_of_week} {self.start_time} to {self.end_time}"
