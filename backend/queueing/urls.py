from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

app_name = 'queueing'
router.register(r'registration-viewset', views.RegistrationViewSet, basename='registration-viewset')
urlpatterns = [
    path('queueing/registration_queueing/', views.PatientRegistrationQueue.as_view(), name='registration_queueing'),
    path('queueing/preliminary_assessment_queueing/', views.PreliminaryAssessmentQueue.as_view(), name='preliminary_assessment_queueing'),
    path('queueing/treatment_queueing/', views.PatientTreatmentQueue.as_view(), name='treatment_queueing'),

    path('queueing/patient-preliminary-assessment/<str:patient_id>/<str:queue_number>/', 
        views.PreliminaryAssessmentForm.as_view(), 
        name='patient-preliminary-assessment'),


    # treatment form    
    path('queueing/patient-treatment/<str:patient_id>/<str:queue_number>/', 
        views.PatientTreatmentForm.as_view(), 
        name='patient-treatment'),

    path('', include(router.urls)),
]
