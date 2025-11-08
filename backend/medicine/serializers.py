from rest_framework import serializers
from .models import Medicine


class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'name', 'dosage_form', 'strength', 'stocks', 'expiration_date']
        read_only_fields = fields

