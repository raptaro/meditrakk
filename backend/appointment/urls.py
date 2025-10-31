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
     
    path('payments/webhook/', views.PayMayaWebhookAPIView.as_view(), name='paymaya-webhook'),
    path('payments/status/<int:payment_id>/', views.CheckPaymentStatusAPIView.as_view(), name='check-payment-status'),
    path('payments/<int:payment_id>/test-webhook/', views.TestWebhookAPIView.as_view(), name='test-webhook'),
    
    # Appointment booking
    path('appointments/book/', views.BookAppointmentAPIView.as_view(), name='book-appointment'),
    path('appointment-requests/<int:request_id>/cancel/', views.CancelAppointmentRequestAPIView.as_view(), name='cancel-appointment-request'),
    path('appointments/<int:appointment_request_id>/upload-gcash/', views.UploadGcashProofAPIView.as_view(), name='upload-gcash-proof'),

    path('payments/test-webhook/', views.TestWebhookAPIView.as_view(), name='test-webhook'),
    path('payments/test-webhook/<int:payment_id>/', views.TestWebhookAPIView.as_view(), name='test-webhook-with-id'),
    path('appointment/', include(router.urls))
]
 
