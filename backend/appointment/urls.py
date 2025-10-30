from django.urls import path, include
from . import views 
from rest_framework.routers import DefaultRouter
app_name = 'appointment'


router = DefaultRouter()
router.register(r'referrals', views.AppointmentReferralViewSet, basename='referral-set')
urlpatterns = [
    path('appointment-referral/', views.DoctorCreateReferralView.as_view(), name='referral'),
    path('appointment-referral-list/', views.ReferralViewList.as_view(), name='referral-list'),
    path('appointment/doctor-schedule/<str:doctor_id>/', views.DoctorSchedule.as_view(), name='doctor-schedule'),
    path('appointment/schedule-appointment/', views.ScheduleAppointment.as_view(), name='schedule-appointment'),
    path('appointment/upcoming-appointments/', views.UpcomingAppointments.as_view(), name='upcoming-appointment'),
    path('queue/debug/', views.QueueDebugMonthView.as_view(), name='queue-debug'),
    path("appointment/<int:appointment_id>/accept/", views.AcceptAppointmentView.as_view(), name="accept-appointment"),
    # path("<uuid:appointment_id>/cancel/", CancelAppointmentView.as_view(), name="cancel-appointment"),
    # path("<uuid:appointment_id>/requeue/", RequeueAppointmentView.as_view(), name="requeue-appointment"),
    path("send-test-email/", views.TestEmailView.as_view(), name="send-test-email"),
     
    path('appointments/book/', views.BookAppointmentAPIView.as_view(), name='book-appointment'),

    # Check payment status (if your Payment.id is integer, use <int:payment_id>)
    path('payments/status/<str:payment_id>/', views.CheckPaymentStatusAPIView.as_view(), name='check-payment-status'),

    # PayMaya webhook (no auth/CSRF required; verify signature inside the view)
    path('payments/webhook/', views.PayMayaWebhookAPIView.as_view(), name='payment-webhook'),

    # Upload proof for a request (prefer appointment-request id for clarity)
    # If you store proof against the appointment request (not final Appointment), use request id:
    path('appointment-requests/<str:request_id>/upload-gcash/', views.UploadGcashProofAPIView.as_view(), name='upload-gcash'),

    # Cancel appointment request (user-initiated cancel before payment / within reservation window)
    path('appointment-requests/<str:request_id>/cancel/', views.CancelAppointmentRequestAPIView.as_view(), name='cancel-appointment-request'),

    # Secretary management
    path('secretary/appointments/', views.SecretaryAppointmentAPIView.as_view(), name='secretary-appointments'),
    path('appointments/<int:appointment_id>/', views.SecretaryAppointmentAPIView.as_view(), name='appointment-detail-or-patch'),

    path('appointment/', include(router.urls))
]
 
