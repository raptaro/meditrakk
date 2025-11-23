from django.shortcuts import render
import numpy as np
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from .models import Medicine
from .serializers import MedicineSerializer
from user.permissions import IsMedicalStaff, isSecretary, isDoctor
from rest_framework.views import APIView

from django.db.models import Q
from patient.serializers import PrescriptionSerializer
from patient.models import Prescription, Diagnosis
from queueing.models import Treatment

from backend.supabase_client import supabase
import pandas as pd
from sklearn.model_selection import train_test_split
import lightgbm as lgb
from lightgbm import LGBMRegressor
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_percentage_error
import math

from patient.serializers import PatientRegistrationSerializer

class MedicineView(generics.ListAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    
    permission_classes = [IsMedicalStaff]


class SearchMedicine(APIView):
    permission_classes = [IsMedicalStaff]  
    
    def get(self, request, format=None):
        query = request.GET.get('q', '')
        
        if query:
            medicines = Medicine.objects.filter(
                Q(name__icontains=query)
            ).distinct()
        else:
            medicines = Medicine.objects.none()
        
        data = []
        for medicine in medicines:
            data.append({
                'id': medicine.id,
                'name': medicine.name,
                'stocks': medicine.stocks, 
                'strength': medicine.strength
            })   
    
        return Response({'medicine': data}, status=status.HTTP_200_OK)
    
class PrescriptionViews(generics.ListAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    
    permission_classes = []


class ConfirmDispenseview(APIView):
    permission_classes = [isSecretary]
    def post(self, request):
        prescriptions_data = request.data.get("prescriptions", [])
        errors = []
        
        for item in prescriptions_data:
            prescription_id = item.get("id")
            try:
                confirmed = int(item.get("confirmed", 0))
            except (ValueError, TypeError):
                errors.append({"id": prescription_id, "error": "Invalid confirmed quantity"})
                continue

            try:
                prescription = Prescription.objects.get(id=prescription_id)
            except Prescription.DoesNotExist:
                errors.append({"id": prescription_id, "error": "Prescription not found"})
                continue

            if confirmed > prescription.quantity:
                errors.append({"id": prescription_id, "error": "Confirmed quantity exceeds the prescribed quantity"})
                continue

            medicine = prescription.medication
            if medicine.stocks < confirmed:
                errors.append({"id": prescription_id, "error": "Not enough stock available"})
                continue

            # Deduct the confirmed quantity from the medicine's stock
            medicine.stocks -= confirmed
            medicine.save()
        
        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "All stocks updated successfully."}, status=status.HTTP_200_OK)

import numpy as np
import pandas as pd
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from lightgbm import LGBMRegressor
from rest_framework.views import APIView
from rest_framework.response import Response
from statsforecast import StatsForecast
from statsforecast.models import CrostonClassic

class Predict(APIView):
    permission_classes = [IsMedicalStaff]
    
    def get(self, request):
        try:
            medicines = supabase.table('medicine_medicine').select().execute()
            prescriptions = supabase.table('patient_prescription').select().execute()
        
            med_df = pd.DataFrame(medicines.data)
            pres_df = pd.DataFrame(prescriptions.data)

            pres_df['start_date'] = pd.to_datetime(pres_df['start_date']) 
            pres_df['month'] = pres_df['start_date'].dt.to_period('M').dt.to_timestamp()
            
            pres_df = pres_df.merge(med_df, left_on='medication_id', right_on='id', how='left')

            monthly = (
                pres_df
                .groupby(['medication_id', 'name', 'month'])
                .agg({'quantity': 'sum'})
                .reset_index()
            )
            prescription_counts = pres_df['medication_id'].value_counts().reset_index()
            prescription_counts.columns = ['medication_id', 'total_prescriptions']
            
            results = []
            
            for medicine_id, group in monthly.groupby('medication_id'):
                medicine_name = group['name'].iloc[0] if 'name' in group.columns else f"Medicine_{medicine_id}"
                months_count = len(group)
                
                print(f"Processing {medicine_id} - {medicine_name}: {months_count} months")
                
                # Get total prescriptions for this medicine
                total_prescriptions = prescription_counts[
                    prescription_counts['medication_id'] == medicine_id
                ]['total_prescriptions'].iloc[0] if medicine_id in prescription_counts['medication_id'].values else 0
                
                # Handle different scenarios based on available data
                if months_count == 0:
                    # No monthly data, use simple frequency-based approach
                    forecast = self._simple_frequency_forecast(total_prescriptions)
                    method = "frequency_based"
                    
                elif months_count == 1:
                    # Only 1 month of data, use trend projection
                    forecast = self._single_month_forecast(group)
                    method = "single_month_trend"
                    
                elif months_count == 2:
                    # 2 months of data, use linear trend
                    forecast = self._two_month_trend_forecast(group)
                    method = "two_month_trend"
                    
                else:
                    # 3+ months of data, use time series methods
                    forecast, method = self._time_series_forecast(group, medicine_id)
                
                result_item = {
                    'medicine_id': int(medicine_id),
                    'name': str(medicine_name),
                    'forecast_next_3_months': forecast,
                    'method': method,
                    'months_of_data': months_count,
                    'total_prescriptions': int(total_prescriptions)
                }
                
                results.append(result_item)
            
            # Sort by total prescriptions (descending)
            results.sort(key=lambda x: x['total_prescriptions'], reverse=True)
            
            print(f"Final results: {len(results)} medicines")
            return Response({'results': results})
            
        except Exception as e:
            print(f"Error in prediction: {str(e)}")
            return Response(
                {'error': 'Failed to generate predictions'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def _simple_frequency_forecast(self, total_prescriptions):
        """Forecast based on prescription frequency when no monthly data is available"""
        if total_prescriptions == 0:
            # Return small but varied forecast: [1, 1, 2] - slight upward trend
            return [1, 1, 2]
        
        # Estimate monthly average and add small variations
        monthly_avg = max(1, round(total_prescriptions / 12))
        # Add slight variations: [slightly less, average, slightly more]
        return [
            max(1, round(monthly_avg * 0.9)),
            monthly_avg,
            max(1, round(monthly_avg * 1.1))
        ]
    
    def _single_month_forecast(self, group):
        """Forecast using single month data with seasonal variation"""
        monthly_avg = group['quantity'].mean()
        base_val = max(1, round(monthly_avg))
        
        # For single month, assume slight downward trend with seasonal adjustment
        # [95%, 100%, 90%] of the base value
        return [
            max(1, round(base_val * 0.95)),
            base_val,
            max(1, round(base_val * 0.90))
        ]
    
    def _two_month_trend_forecast(self, group):
        """Forecast using linear trend from 2 months of data"""
        group = group.sort_values('month')
        quantities = group['quantity'].values
        
        if len(quantities) == 2:
            # Calculate simple trend
            trend = quantities[1] - quantities[0]
            base = quantities[1]
            
            # Project trend forward with slight damping
            forecast = []
            for i in range(1, 4):
                # Dampen the trend effect over time (use 0.8, 0.6, 0.4 factors)
                damped_trend = trend * (0.8 - (i-1)*0.2)
                forecast_val = max(1, round(base + damped_trend * i))
                forecast.append(forecast_val)
            return forecast
        else:
            # Fallback with variation
            avg_val = max(1, round(group['quantity'].mean()))
            return [avg_val, max(1, round(avg_val * 1.1)), max(1, round(avg_val * 0.9))]
    
    def _time_series_forecast(self, group, medicine_id):
        """Advanced forecasting for medicines with sufficient historical data"""
        group = group.sort_values('month')
        group = group.set_index('month')
        
        # Create full date range and fill missing months
        full_range = pd.date_range(start=group.index.min(), end=group.index.max(), freq='MS')
        group = group.reindex(full_range)
        
        group['quantity'] = group['quantity'].fillna(0)
        group['name'] = group['name'].ffill()
        group['medication_id'] = group['medication_id'].ffill()
        
        # Calculate sparsity
        sparsity = (group['quantity'] == 0).mean()
        
        if sparsity > 0.7:  # Intermittent demand
            print(f"  Using Croston for intermittent demand (sparsity: {sparsity:.2f})")
            return self._croston_forecast(group, medicine_id)
        else:  # Regular demand
            print(f"  Using LGBM for regular demand (sparsity: {sparsity:.2f})")
            return self._lgbm_forecast(group)
    
    def _croston_forecast(self, group, medicine_id):
        """Croston method for intermittent demand"""
        try:
            non_zero = group[group['quantity'] > 0]
            if len(non_zero) > 1:
                sf_df = group.reset_index(names='month')[['month', 'quantity']].rename(
                    columns={'month': 'ds', 'quantity': 'y'}
                )
                sf_df['unique_id'] = medicine_id
                
                sf = StatsForecast(
                    models=[CrostonClassic()], 
                    freq='M',
                    n_jobs=-1
                )
                
                forecast_result = sf.forecast(df=sf_df, h=3)
                forecast = forecast_result['CrostonClassic'].tolist()
                forecast = [max(0, round(x)) for x in forecast]  # Ensure non-negative
                
                # Ensure we have variation (not all same values)
                if len(set(forecast)) == 1 and forecast[0] > 0:
                    # Add small variations
                    base = forecast[0]
                    forecast = [max(1, base-1), base, max(1, base+1)]
                
                return forecast, "croston"
            else:
                # Fallback with trend
                avg_quantity = group['quantity'].mean()
                base_val = max(1, round(avg_quantity))
                forecast = [max(1, base_val-1), base_val, max(1, base_val+1)]
                return forecast, "croston_fallback_trend"
                
        except Exception as e:
            print(f"Croston forecast error: {e}")
            avg_quantity = group['quantity'].mean()
            base_val = max(1, round(avg_quantity))
            forecast = [max(1, base_val-1), base_val, max(1, base_val+1)]
            return forecast, "croston_error_fallback_trend"
    
    def _lgbm_forecast(self, group):
        """LGBM forecasting for regular demand patterns"""
        try:
            group = group.reset_index()  
            group['month_index'] = range(len(group))
            group['lag_1'] = group['quantity'].shift(1)
            group['lag_2'] = group['quantity'].shift(2)
            group = group.dropna()
            
            if len(group) < 3:
                # Use trend-based forecast instead of same values
                avg_quantity = group['quantity'].mean()
                base_val = max(1, round(avg_quantity))
                forecast = [max(1, base_val-1), base_val, max(1, base_val+1)]
                return forecast, "lgbm_insufficient_data_trend"
            
            # Features and target
            features = ['month_index', 'lag_1', 'lag_2']
            X = group[features].values
            y = group['quantity'].values
            
            # Train-test split
            split_idx = max(1, int(0.8 * len(group)))
            X_train, X_test = X[:split_idx], X[split_idx:]
            y_train, y_test = y[:split_idx], y[split_idx:]
            
            if len(X_train) < 2 or len(X_test) < 1:
                avg_quantity = group['quantity'].mean()
                base_val = max(1, round(avg_quantity))
                forecast = [max(1, base_val-1), base_val, max(1, base_val+1)]
                return forecast, "lgbm_insufficient_split_trend"
            
            # Model training
            model = LGBMRegressor(
                random_state=42,
                n_estimators=100,
                learning_rate=0.05,
                max_depth=3,
                num_leaves=15,
                min_child_samples=5
            )
            model.fit(X_train, y_train)
            
            # Iterative forecasting
            last_row = group.iloc[-1]
            forecasts = []
            lag1 = last_row['quantity']
            lag2 = group.iloc[-2]['quantity'] if len(group) > 1 else 0
            
            for i in range(1, 4):
                next_idx = last_row['month_index'] + i
                X_next = [[next_idx, lag1, lag2]]
                pred = model.predict(X_next)[0]
                pred = max(0, pred)
                if np.isnan(pred) or np.isinf(pred):
                    # Use trend-based fallback
                    base_val = max(1, round(group['quantity'].mean()))
                    pred = base_val + (i-1)  # Simple increment
                
                forecasts.append(int(pred))
                
                # Update lags
                lag2 = lag1
                lag1 = pred
            
            # Ensure we have some variation
            if len(set(forecasts)) == 1:
                base = forecasts[0]
                forecasts = [max(1, base-1), base, max(1, base+1)]
                method = "lgbm_adjusted"
            else:
                method = "lgbm"
            
            return forecasts, method
            
        except Exception as e:
            print(f"LGBM forecast error: {e}")
            avg_quantity = group['quantity'].mean()
            base_val = max(1, round(avg_quantity))
            forecast = [max(1, base_val-1), base_val, max(1, base_val+1)]
            return forecast, "lgbm_error_fallback_trend"
        
class MedicineCSVUploadView(APIView):
    permission_classes = [IsMedicalStaff]   
        
    def post(self, request):
        try:
            # basahin yung CSV file sa backend mismo
            df = pd.read_csv("medicine/medicines-malibiran.csv").rename(columns={
                "Name": "name",
                "Dosage Form": "dosage_form",
                "Strength": "strength",
                "Stock": "stocks",
                "Expiration Date": "expiration_date",
            })

            # insert sa supabase
            supabase.table("medicine_medicine").insert(df.to_dict(orient="records")).execute()

            return Response({"message": "Medicines uploaded successfully"}, status=201)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Medicine
from .serializers import MedicineSerializer, MedicineWriteSerializer

class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    
    def get_serializer_class(self):
        # Use write serializer for create/update actions
        if self.action in ['create', 'update', 'partial_update']:
            return MedicineWriteSerializer
        return MedicineSerializer
    
    def create(self, request):
        serializer = MedicineWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        medicine = get_object_or_404(Medicine, pk=pk)
        serializer = MedicineWriteSerializer(medicine, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, request, pk=None):
        medicine = get_object_or_404(Medicine, pk=pk)
        serializer = MedicineWriteSerializer(medicine, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Archive action (soft delete)
    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        medicine = get_object_or_404(Medicine, pk=pk)
        medicine.is_active = False
        medicine.save()
        return Response({'status': 'medicine archived'}, status=status.HTTP_200_OK)
    
    # Unarchive action
    @action(detail=True, methods=['post'])
    def unarchive(self, request, pk=None):
        medicine = get_object_or_404(Medicine, pk=pk)
        medicine.is_active = True
        medicine.save()
        return Response({'status': 'medicine unarchived'}, status=status.HTTP_200_OK)
    
    # List only active medicines by default
    def get_queryset(self):
        queryset = Medicine.objects.all()
        # Filter by archive status if specified
        show_archived = self.request.query_params.get('show_archived', 'false').lower() == 'true'
        if not show_archived:
            queryset = queryset.filter(is_active=True)
        return queryset
    
    # Separate endpoint to list archived medicines
    @action(detail=False, methods=['get'])
    def archived(self, request):
        archived_medicines = Medicine.objects.filter(is_active=False)
        serializer = self.get_serializer(archived_medicines, many=True)
        return Response(serializer.data)

# import random
# from datetime import date, timedelta

# from django.db import transaction
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# from patient.models import Patient, Prescription
# from medicine.models import Medicine

# from datetime import date, datetime
# from django.db.models import Max
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# from queueing.models import Patient, TemporaryStorageQueue
# class AddDummy(APIView):
#     permission_class = [isSecretary]
#     def post(self, request):
#         dummy_data = {
#             "first_name": "John",
#             "middle_name": "M",
#             "last_name": "Doe",
#             "email": "johndoe@example.com",
#             "phone_number": "09123456789",
#             "date_of_birth": date(2024, 9, 15),
#             "gender": "Male",
#             "street_address": "123 Main Street",
#             "barangay": "Barangay Uno",
#             "municipal_city": "Quezon City",
#             "agree_terms": True,
#             "complaint": "Check-up",
#             "priority_level": "Regular"
#         }
#         serializer = PatientRegistrationSerializer(data=dummy_data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         validated_data = serializer.validated_data
#         validated_data["date_of_birth"] = validated_data["date_of_birth"].strftime("%Y-%m-%d")

#         try:
#             # Handle complaint value
#             complaint_value = validated_data.get('complaint', '')
#             if complaint_value == "Other":
#                 complaint_value = ""  # No free-text in dummy

#             # Determine next queue number
#             last_queue_number = TemporaryStorageQueue.objects.aggregate(
#                 Max('queue_number')
#             )['queue_number__max']
#             queue_number = (last_queue_number or 0) + 1

#             # Create patient record
#             patient = Patient.objects.create(
#                 first_name=validated_data.get('first_name', ''),
#                 middle_name=validated_data.get('middle_name', ''),
#                 last_name=validated_data['last_name'],
#                 email=validated_data['email'],
#                 phone_number=validated_data['phone_number'],
#                 date_of_birth=datetime.strptime(validated_data['date_of_birth'], '%Y-%m-%d').date(),
#                 gender=validated_data.get('gender', ''),
#                 street_address=validated_data.get('street_address', ''),
#                 barangay=validated_data.get('barangay', ''),
#                 municipal_city=validated_data.get('municipal_city', '')
#             )

#             # Create queue entry
#             queue_entry = TemporaryStorageQueue.objects.create(
#                 patient=patient,
#                 priority_level=validated_data.get('priority_level', 'Regular'),
#                 queue_number=queue_number,
#                 complaint=complaint_value,
#                 status='Waiting'
#             )

#             # Return success
#             return Response({
#                 "message": "Dummy patient registered successfully.",
#                 "patient": PatientRegistrationSerializer(patient).data,
#                 "queue_entry": {
#                     "id": queue_entry.id,
#                     "priority_level": queue_entry.priority_level,
#                     "status": queue_entry.status,
#                     "queue_number": queue_entry.queue_number,
#                     "complaint": queue_entry.complaint
#                 }
#             }, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
# from datetime import date
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from queueing.serializers import PreliminaryAssessmentSerializer


# class DummyPreliminaryAssessmentView(APIView):
#     def post(self, request, patient_id, queue_number):
#         try:
#             # Get the patient by custom PK
#             patient = Patient.objects.get(patient_id=patient_id)
            
#             # Get queue entry
#             queue_entry = TemporaryStorageQueue.objects.get(patient=patient, queue_number=queue_number)

#             # Only allow if queue status is Accepted
#             if queue_entry.status != "Queued for Assessment":
#                 return Response({"error": f"Patient's queue status is '{queue_entry.status}', must be 'Accepted'."}, status=status.HTTP_400_BAD_REQUEST)

#             # Update status to next stage
#             queue_entry.status = 'Queued for Treatment'
#             queue_entry.save()

#         except Patient.DoesNotExist:
#             return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
#         except TemporaryStorageQueue.DoesNotExist:
#             return Response({'error': 'Queue entry not found'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         # Dummy assessment data
#         dummy_data = {
#             "blood_pressure": "120/80",
#             "temperature": "36.7",
#             "heart_rate": 75,
#             "respiratory_rate": 18,
#             "pulse_rate": 75,
#             "allergies": "None",
#             "medical_history": "No significant history",
#             "symptoms": "Mild headache",
#             "current_medications": "None",
#             "pain_scale": 2,
#             "pain_location": "Forehead",
#             "smoking_status": "Non-smoker",
#             "alcohol_use": "Occasional",
#             "assessment": "Stable condition"
#         }

#         # Serialize and save
#         serializer = PreliminaryAssessmentSerializer(data=dummy_data, context={'patient': patient})
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message': 'Dummy assessment created successfully', 'queue_number': queue_number}, status=status.HTTP_201_CREATED)
#         else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class DummyTreatment(APIView):
#     """
#     Create a dummy Treatment for a patient and mark the queue entry Completed.
#     Mirrors the logic used in PatientTreatmentForm but with hard-coded test data.
#     """

#     def post(self, request, patient_id, queue_number):
#         try:
#             # 1. Resolve patient and queue
#             patient = Patient.objects.get(patient_id=patient_id)
#             queue = TemporaryStorageQueue.objects.get(patient=patient, queue_number=queue_number)

#         except Patient.DoesNotExist:
#             return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
#         except TemporaryStorageQueue.DoesNotExist:
#             return Response({'error': 'Queue entry not found'}, status=status.HTTP_404_NOT_FOUND)

#         # Use an atomic transaction to avoid partial writes
#         try:
#             with transaction.atomic():
#                 # 2. Update queue status to Completed
#                 queue.status = 'Completed'
#                 queue.save()

#                 # 3. Create Treatment record (doctor is request.user - ensured by isDoctor)
#                 treatment = Treatment.objects.create(
#                     patient=patient,
#                     treatment_notes="Dummy treatment notes for testing.",
#                     doctor=request.user
#                 )

#                 # 4. Dummy diagnoses (create and attach)
#                 dummy_diagnoses = [
#                     {
#                         "diagnosis_code": "DUMMY-001",
#                         "diagnosis_description": "Dummy diagnosis A",
#                         "diagnosis_date": date.today()
#                     },
#                     {
#                         "diagnosis_code": "DUMMY-002",
#                         "diagnosis_description": "Dummy diagnosis B",
#                         "diagnosis_date": date.today()
#                     }
#                 ]

#                 for diag in dummy_diagnoses:
#                     diagnosis_obj, created = Diagnosis.objects.get_or_create(
#                         patient=patient,
#                         diagnosis_code=diag["diagnosis_code"],
#                         defaults={
#                             "diagnosis_description": diag["diagnosis_description"],
#                             "diagnosis_date": diag["diagnosis_date"]
#                         }
#                     )
#                     # If get_or_create found an existing record it won't update fields; you can update if desired
#                     treatment.diagnoses.add(diagnosis_obj)

#                 # 5. Dummy prescription(s)
#                 # Ensure there is at least one medicine to reference
#                 medicine = Medicine.objects.first()
#                 if not medicine:
#                     # If no medicine exists in DB, roll back with error
#                     raise ValueError("No Medicine records found in the database. Add a Medicine before creating a prescription.")

#                 # Check expiry for chosen medicine
#                 if medicine.expiration_date and medicine.expiration_date < date.today():
#                     raise ValueError(f"Selected medicine '{medicine.name}' is expired (expiration_date={medicine.expiration_date}).")

#                 start = date.today()
#                 end = start + timedelta(days=7)

#                 # Use get_or_create similar to your real form
#                 prescription_obj, created = Prescription.objects.get_or_create(
#                     patient=patient,
#                     medication=medicine,
#                     dosage="1 tablet",
#                     frequency="Twice a day",
#                     quantity=14,
#                     start_date=start,
#                     end_date=end
#                 )
#                 treatment.prescriptions.add(prescription_obj)

#                 # 6. Return success
#                 return Response({
#                     "message": "Dummy treatment created successfully.",
#                     "treatment_id": treatment.pk,
#                     "queue_number": queue_number,
#                     "diagnoses_created_or_attached": [d.diagnosis_code for d in treatment.diagnoses.all()],
#                     "prescriptions_attached": [p.medication.name for p in treatment.prescriptions.all()]
#                 }, status=status.HTTP_201_CREATED)

#         except ValueError as ve:
#             # clear, user-friendly error (rolled back automatically)
#             return Response({"error": str(ve)}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             # generic error -> rolled back
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# # views_bulk_dummy.py
# import random
# from datetime import date, timedelta, datetime

# from django.db import transaction
# from django.db.models import Max
# from django.contrib.auth import get_user_model

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# from patient.models import Patient, Prescription
# from patient.serializers import PatientRegistrationSerializer
# from medicine.models import Medicine
# from queueing.models import TemporaryStorageQueue, PreliminaryAssessment, Treatment, Diagnosis
# from queueing.serializers import PreliminaryAssessmentSerializer

# # Permission from your project (keeps consistency with your earlier code)

# # Faker (optional) — code will work without Faker
# try:
#     from faker import Faker
#     fake = Faker('en_PH')
#     Faker.seed(42)
#     fake.seed_instance(42)
#     USE_FAKER = True
# except Exception:
#     fake = None
#     USE_FAKER = False

# User = get_user_model()

# class BulkDummyFlowAPIView(APIView):
#     """
#     POST: create many dummy patients and run each through:
#       registration -> preliminary assessment -> treatment (diagnoses + prescriptions)
#     Request body:
#       { "count": <int> }  # optional, default 300
#     """
#     permission_classes = [isSecretary]

#     def _rand_phone(self):
#         if USE_FAKER:
#             try:
#                 ph = fake.phone_number()
#                 digits = ''.join(ch for ch in ph if ch.isdigit())
#                 if len(digits) >= 10:
#                     # normalize to 10-digit local format (drop country code if present)
#                     return digits[-10:]
#                 return ph
#             except Exception:
#                 pass
#         # fallback
#         return f"09{random.randint(100000000, 999999999)}"

#     def _rand_name(self):
#         if USE_FAKER:
#             return fake.first_name(), fake.last_name(), fake.random_element(elements=('A','B','C'))  # (first, last, middle)
#         # deterministic fallback
#         i = random.randint(1000, 9999)
#         return f"Test{i}", f"Patient{i}", "M"

#     def _random_dob(self):
#         # random DOB between 1940-01-01 and 2024-12-31
#         start = date(1940, 1, 1)
#         end = date(2024, 12, 31)
#         delta = (end - start).days
#         return start + timedelta(days=random.randint(0, delta))

#     def _random_registration_date(self, start_date, end_date):
#         delta = (end_date - start_date).days
#         return start_date + timedelta(days=random.randint(0, max(delta, 0)))

#     def post(self, request):
#         count = int(request.data.get('count', 300))
#         # Range: from Sept 1, 2024 to Aug 18, 2025 (per your environment)
#         start_date = date(2024, 9, 1)
#         end_date = date(2025, 8, 18)

#         created = 0
#         errors = []

#         # Ensure the four medicines exist (create if missing). Use sensible expiration dates.
#         meds_to_ensure = [
#             (1056, "Cefcillin", "954 mg"),
#             (1048, "Acetocillin", "938 mg"),
#             (1052, "Amoxicillin", "802 mg"),
#             (1050, "Dextrophen", "333 mg"),
#         ]
#         ensured_meds = {}
#         for pk, name, dosage in meds_to_ensure:
#             defaults = {
#                 "name": name,
#                 # try to set a plausible field -- many models use 'dosage' or 'strength'; adjust if different
#                 "dosage": dosage if hasattr(Medicine, 'dosage') or True else dosage,
#                 "expiration_date": end_date + timedelta(days=365)  # at least 1 year in future
#             }
#             med_obj, _ = Medicine.objects.get_or_create(pk=pk, defaults=defaults)
#             ensured_meds[pk] = med_obj

#         # Determine a doctor to attach to Treatments: prefer a staff user, else fallback to request.user
#         doctor_user = User.objects.filter(is_staff=True).first() or request.user

#         for i in range(count):
#             # Per-patient atomic block (uses savepoint so failures for one don't abort others)
#             try:
#                 with transaction.atomic():
#                     # Registration data
#                     first_name, last_name, middle_name = self._rand_name()
#                     dob = self._random_dob()
#                     reg_date = self._random_registration_date(start_date, end_date)

#                     dummy_data = {
#                         "first_name": first_name,
#                         "middle_name": middle_name,
#                         "last_name": last_name,
#                         "email": f"{first_name.lower()}.{last_name.lower()}.{random.randint(1,9999)}@example.com",
#                         "phone_number": self._rand_phone(),
#                         "date_of_birth": dob,
#                         "gender": random.choice(["Male", "Female"]),
#                         "street_address": f"{random.randint(1,999)} Example St.",
#                         "barangay": random.choice(["Barangay Uno","Barangay Dos","Barangay Tres"]),
#                         "municipal_city": random.choice(["Quezon City","Manila","Caloocan"]),
#                         "agree_terms": True,
#                         "complaint": random.choice(["Check-up", "General Illness", "Injury", "Other"]),
#                         "priority_level": random.choice(["Regular","Priority"])
#                     }

#                     # Validate via existing serializer (mirrors your existing registration path)
#                     serializer = PatientRegistrationSerializer(data=dummy_data)
#                     if not serializer.is_valid():
#                         # If serializer rejects, collect error and skip this patient
#                         errors.append({"index": i, "reason": "registration_validation", "details": serializer.errors})
#                         continue

#                     validated = serializer.validated_data
#                     # Create patient
#                     patient = Patient.objects.create(
#                         first_name=validated.get("first_name", ""),
#                         middle_name=validated.get("middle_name", ""),
#                         last_name=validated.get("last_name", ""),
#                         email=validated.get("email", ""),
#                         phone_number=validated.get("phone_number", ""),
#                         date_of_birth=validated.get("date_of_birth"),
#                         gender=validated.get("gender", ""),
#                         street_address=validated.get("street_address", ""),
#                         barangay=validated.get("barangay", ""),
#                         municipal_city=validated.get("municipal_city", "")
#                     )

#                     # Determine next queue_number
#                     last_queue_number = TemporaryStorageQueue.objects.aggregate(Max('queue_number'))['queue_number__max'] or 0
#                     queue_number = last_queue_number + 1

#                     # Create queue entry as 'Waiting' initially
#                     queue_entry = TemporaryStorageQueue.objects.create(
#                         patient=patient,
#                         priority_level=validated.get('priority_level', 'Regular'),
#                         queue_number=queue_number,
#                         complaint=(validated.get('complaint') or ""),
#                         status='Waiting',
#                         created_at=reg_date if hasattr(TemporaryStorageQueue, 'created_at') else None
#                     )

#                     # Simulate the process progression:
#                     # Waiting -> Accepted -> Queued for Assessment -> Queued for Treatment -> Completed
#                     queue_entry.status = 'Accepted'
#                     queue_entry.save()

#                     queue_entry.status = 'Queued for Assessment'
#                     queue_entry.save()

#                     # Create a preliminary assessment using your serializer
#                     assessment_data = {
#                         "blood_pressure": f"{random.randint(100,130)}/{random.randint(60,90)}",
#                         "temperature": f"{round(random.uniform(36.1,38.5), 1)}",
#                         "heart_rate": random.randint(60,100),
#                         "respiratory_rate": random.randint(12,22),
#                         "pulse_rate": random.randint(60,100),
#                         "allergies": random.choice(["None", "Penicillin", "Aspirin"]),
#                         "medical_history": random.choice(["No significant history", "Hypertension"]),
#                         "symptoms": random.choice(["Cough","Fever","Headache","Mild pain"]),
#                         "current_medications": random.choice(["None", "Paracetamol"]),
#                         "pain_scale": random.randint(0,5),
#                         "pain_location": random.choice(["Head","Chest","Abdomen"]),
#                         "smoking_status": random.choice(["Non-smoker", "Former smoker"]),
#                         "alcohol_use": random.choice(["None", "Occasional"]),
#                         "assessment": random.choice(["Stable condition", "Needs observation"])
#                     }
#                     pa_serializer = PreliminaryAssessmentSerializer(data=assessment_data, context={'patient': patient})
#                     if not pa_serializer.is_valid():
#                         # collect error but continue to treatment step if you prefer; here we skip this patient
#                         errors.append({"index": i, "reason": "prelim_validation", "details": pa_serializer.errors})
#                         continue
#                     pa_serializer.save()

#                     # Update status to Queued for Treatment
#                     queue_entry.status = 'Queued for Treatment'
#                     queue_entry.save()

#                     # Create Treatment
#                     treatment = Treatment.objects.create(
#                         patient=patient,
#                         treatment_notes="Auto-generated dummy treatment.",
#                         doctor=doctor_user
#                     )

#                     # Create 1-2 dummy diagnoses and attach
#                     for d_j in range(random.randint(1, 2)):
#                         diag_code = f"DUMMY-{random.randint(1000,9999)}"
#                         diag_desc = random.choice(["Acute upper respiratory infection", "Unspecified fever", "Minor headache"])
#                         diag_date = reg_date
#                         diag_obj, _ = Diagnosis.objects.get_or_create(
#                             patient=patient,
#                             diagnosis_code=diag_code,
#                             defaults={
#                                 "diagnosis_description": diag_desc,
#                                 "diagnosis_date": diag_date
#                             }
#                         )
#                         treatment.diagnoses.add(diag_obj)

#                     # Create 1-2 prescriptions using the ensured medicine set
#                     med_choice_pk = random.choice(list(ensured_meds.keys()))
#                     med_obj = ensured_meds[med_choice_pk]

#                     # check expiry
#                     if getattr(med_obj, "expiration_date", None) and med_obj.expiration_date < date.today():
#                         # skip creating prescription for expired med
#                         errors.append({"index": i, "reason": "medicine_expired", "med": med_obj.name})
#                         # still mark queue as Completed and continue
#                         queue_entry.status = 'Completed'
#                         queue_entry.save()
#                         created += 1
#                         continue

#                     # Build prescription record(s)
#                     start = reg_date
#                     duration_days = random.choice([3,5,7,10])
#                     end = start + timedelta(days=duration_days)

#                     quantity = random.randint(3, 30)
#                     frequency = random.choice(["Once a day", "Twice a day", "Three times a day"])

#                     # Use Prescription model's fields similar to earlier code
#                     prescription_obj, _ = Prescription.objects.get_or_create(
#                         patient=patient,
#                         medication=med_obj,
#                         dosage=f"{med_obj.dosage if getattr(med_obj,'dosage',None) else '1 tablet'}",
#                         frequency=frequency,
#                         quantity=quantity,
#                         start_date=start,
#                         end_date=end
#                     )
#                     treatment.prescriptions.add(prescription_obj)

#                     # Finalize: mark queue Completed
#                     queue_entry.status = 'Completed'
#                     queue_entry.save()

#                     created += 1

#             except Exception as e:
#                 # collect error and continue with next patient
#                 errors.append({"index": i, "error": str(e)})
#                 continue

#         return Response({
#             "message": "Bulk dummy flow completed",
#             "requested": count,
#             "created": created,
#             "errors_count": len(errors),
#             "errors_sample": errors[:10]  # return up to 10 error samples for debugging
#         }, status=status.HTTP_201_CREATED if created > 0 else status.HTTP_400_BAD_REQUEST)
