from rest_framework import serializers
from .models import Konsultasi, Proyek, Gambar, GambarProyek, Biaya, Klien, Kontak
import os

class KonsultasiSerializers(serializers.ModelSerializer):
    class Meta:
        model = Konsultasi
        fields = ['nama', 'email', 'kontak', 'proyek', 'budget', 'timeline_proyek', 'deskripsi']
    
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
    
class ProyekSerializers(serializers.ModelSerializer):
    class Meta:
        model = Proyek
        fields = '__all__'
        
class GambarSerializers(serializers.ModelSerializer):
    class Meta:
        model = Gambar
        fields = '__all__'
        
class GambarProyekSerializers(serializers.ModelSerializer):
    class Meta:
        model = GambarProyek
        fields = '__all__'
        
class BiayaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Biaya
        fields = '__all__'
        
class KlienSerializers(serializers.ModelSerializer):
    class Meta:
        model = Klien
        fields = '__all__'
        
class KontakSerializers(serializers.ModelSerializer):
    class Meta:
        model = Kontak
        fields = '__all__'