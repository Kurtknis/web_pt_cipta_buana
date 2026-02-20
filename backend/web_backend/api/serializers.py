from rest_framework import serializers
from .models import Consultation
import os

class ConsultationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['nama', 'email', 'Contact', 'Project', 'budget', 'timeline_Project', 'deskripsi']
    
    def validate_deskripsi(self, value):
        forbidden_words_file = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            'frontend', 'media', 'forbidden_word.txt')
        
        if os.path.exists(forbidden_words_file):
            with open(forbidden_words_file, 'r', encoding='utf-8') as f:
                forbidden_words = [word.strip().lower() for word in f.readlines() if word.strip()]
            description_lower = value.lower()
            for forbidden_word in forbidden_words:
                if forbidden_word in description_lower:
                    raise serializers.ValidationError('Deskripsi mengandung kata yang tidak diperbolehkan. Silakan perbaiki deskripsi Anda.')
        
        return value
    