# services/health_tip_service.py
import yaml
import os
from django.conf import settings
from .models import HealthTips, Diagnosis
from user.models import Doctor

class HealthTipGenerator:
    def __init__(self, rules_file=None):
        if rules_file is None:
            rules_file = os.path.join(settings.BASE_DIR, 'patient', 'rule.yaml')
        
        # Debug file existence
        print(f"Rules file path: {rules_file}")
        print(f"File exists: {os.path.exists(rules_file)}")
        
        if not os.path.exists(rules_file):
            print(f"WARNING: Rules file not found at: {rules_file}")
            # List available YAML files
            try:
                files = os.listdir(settings.BASE_DIR)
                yaml_files = [f for f in files if f.endswith(('.yaml', '.yml'))]
                print(f"Available YAML files: {yaml_files}")
            except Exception as e:
                print(f"Error listing files: {e}")
        
        self.rules_file = rules_file
        self.rules = self._load_rules()
        print(f"Final loaded rules: {list(self.rules.keys()) if self.rules else 'No rules found'}")
    
    def _load_rules(self):
        """Load rules from YAML file with nested structure"""
        try:
            print(f"Looking for rules file at: {self.rules_file}")
            
            if not os.path.exists(self.rules_file):
                print(f"File not found, using fallback rules")
                return self._get_fallback_rules()
            
            with open(self.rules_file, 'r') as file:
                yaml_data = yaml.safe_load(file)
                print(f"Raw YAML data type: {type(yaml_data)}")
                print(f"Raw YAML keys: {list(yaml_data.keys()) if yaml_data else 'None'}")
                
                if yaml_data and 'health_tip_rules' in yaml_data:
                    rules = yaml_data['health_tip_rules']
                    print(f"Successfully loaded {len(rules)} rules from health_tip_rules")
                    print(f"Rule names: {list(rules.keys())}")
                    return rules
                else:
                    print("No health_tip_rules found in YAML, using fallback")
                    
        except Exception as e:
            print(f"Error loading YAML, using fallback: {e}")

    
    
    def _matches_conditions(self, diagnosis, conditions):
        """Check if diagnosis matches any of the conditions"""
        print(f"Checking diagnosis: {diagnosis.diagnosis_code} - {diagnosis.diagnosis_description}")
        
        for condition in conditions:
            try:
                print(f"  Testing condition: {condition}")
                
                # Check diagnosis code condition
                if condition.startswith("diagnosis.diagnosis_code in"):
                    codes = eval(condition.split("in")[1].strip())
                    print(f"    Codes to match: {codes}")
                    print(f"    Diagnosis code: {diagnosis.diagnosis_code}")
                    
                    if diagnosis.diagnosis_code and diagnosis.diagnosis_code.upper() in [c.upper() for c in codes]:
                        print(f"    ✓ MATCHED code condition!")
                        return True
                    else:
                        print(f"    ✗ No code match")
                
                # Check diagnosis description condition
                elif condition.startswith("'") and "in diagnosis.diagnosis_description.lower()" in condition:
                    keyword = condition.split("'")[1]
                    print(f"    Keyword to match: '{keyword}'")
                    print(f"    Diagnosis description: {diagnosis.diagnosis_description}")
                    
                    if (diagnosis.diagnosis_description and 
                        keyword.lower() in diagnosis.diagnosis_description.lower()):
                        print(f"    ✓ MATCHED description condition!")
                        return True
                    else:
                        print(f"    ✗ No description match")
                        
            except Exception as e:
                print(f"Error evaluating condition {condition}: {e}")
                continue
        return False
    
    def generate_tips_for_diagnosis(self, diagnosis):
        """Generate health tips for a specific diagnosis (without saving)"""
        if not self.rules:
            print("No rules loaded!")
            return []
        
        tips = []
        for rule_name, rule_data in self.rules.items():
            print(f"Checking rule: {rule_name}")
            conditions = rule_data.get('conditions', [])
            rule_tips = rule_data.get('tips', [])
            
            if self._matches_conditions(diagnosis, conditions):
                print(f"Rule '{rule_name}' matched! Adding {len(rule_tips)} tips")
                tips.extend(rule_tips)
            else:
                print(f"Rule '{rule_name}' did not match")
        
        print(f"Total tips generated for diagnosis {diagnosis.id}: {len(tips)}")
        return tips
    
    def generate_tips_for_patient(self, patient, doctor):
        """Generate health tips for all diagnoses of a patient"""
        print(f"Generating tips for patient: {patient.patient_id} - {patient.full_name}")
        diagnoses = Diagnosis.objects.filter(patient=patient)
        print(f"Found {diagnoses.count()} diagnoses for patient")
        
        all_tips = []
        for diagnosis in diagnoses:
            print(f"\n--- Processing Diagnosis ID {diagnosis.id} ---")
            tip_texts = self.generate_tips_for_diagnosis(diagnosis)
            print(f"Generated {len(tip_texts)} tips for this diagnosis")
            
            for tip_text in tip_texts:
                all_tips.append({
                    'diagnosis_id': diagnosis.id,
                    'diagnosis_code': diagnosis.diagnosis_code,
                    'diagnosis_description': diagnosis.diagnosis_description,
                    'tip_text': tip_text,
                    'source': 'auto_generated'
                })
        
        print(f"\n=== TOTAL TIPS GENERATED: {len(all_tips)} ===")
        return all_tips
    
    def create_pending_tips(self, patient, doctor, tips_data):
        """Create HealthTips objects from the generated tips data"""
        created_tips = []
        
        for tip_data in tips_data:
            try:
                diagnosis = Diagnosis.objects.get(id=tip_data['diagnosis_id'])
                
                health_tip = HealthTips.objects.create(
                    patient=patient,
                    diagnosis=diagnosis,
                    doctor=doctor,
                    tip_text=tip_data['tip_text'],
                    source=tip_data['source'],
                    is_for_patient=True,
                    status='pending',
                    is_auto_generated=True
                )
                created_tips.append(health_tip)
            except Diagnosis.DoesNotExist:
                print(f"Diagnosis not found: {tip_data['diagnosis_id']}")
                continue
            except Exception as e:
                print(f"Error creating health tip: {str(e)}")
                continue
        
        return created_tips