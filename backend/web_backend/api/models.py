from django.db import models

# Create your models here.

class Konsultasi(models.Model):
    nama = models.CharField(max_length=100, default='N/A')
    email = models.EmailField(max_length=200, default='N/A')
    kontak = models.CharField(max_length=20, default='N/A')
    proyek = models.CharField(max_length=50, default='N/A')
    budget = models.CharField(max_length=50, default='N/A')
    timeline_proyek = models.CharField(max_length=50, default='N/A')
    deskripsi = models.TextField(default='N/A')
    tanggal_pengiriman_form = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Data Konsultasi'
        verbose_name_plural = verbose_name
        ordering = ['-tanggal_pengiriman_form']