from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

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
        
    def __str__(self):
        return f'{self.nama} - {self.proyek}'
    
class Gambar(models.Model):
    gambar = models.ImageField(upload_to='gambar/')
    alt = models.CharField(blank=True, null=True)
    kategori = models.CharField(default='-')
    deskripsi = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name = 'Data Konsultasi'
        verbose_name_plural = verbose_name
    
    def save(self, *args, **kwargs):
        if not self.alt:
            self.alt = f'{self.gambar} Image'
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'Gambar {self.alt}'
    
class Proyek(models.Model):
    judul = models.CharField(max_length=100)
    lokasi = models.CharField(max_length=100, default='-')
    tanggal = models.IntegerField(blank=True, null=True, default='-')
    deskripsi = models.TextField(blank=True, null=True, default='-')
    harga = models.CharField(blank=True, null=True, default='-')
    durasi = models.CharField(blank=True, null=True, default='-')
    
    class Meta:
        verbose_name = 'Daftar Proyek'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return self.judul
    
class GambarProyek(models.Model):
    proyek = models.ForeignKey(Proyek, on_delete=models.CASCADE, related_name='gambar')
    gambar = models.ImageField(upload_to='gambar_proyek/')
    alt = models.CharField(blank=True, null=True)
    kategori = models.CharField(default='-')
    deskripsi = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name = 'Galeri Proyek'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return f'Gambar {self.proyek}'
    
class Biaya(models.Model):
    luas = models.CharField(max_length=100)
    harga = models.CharField(max_length=50)
    deskripsi = models.TextField(blank=True, null=True, default='-')
    
    class Meta:
        verbose_name = 'Daftar Harga per meter persegi'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return f'{self.luas} - {self.harga}'
    
class Klien(models.Model):
    nama = models.CharField(max_length=100)
    
    class Meta:
        verbose_name = 'Daftar Klien'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return self.nama
    
class Kontak(models.Model):
    telepon = PhoneNumberField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    alamat = models.CharField(blank=True, null=True, max_length=200)
    
    class Meta:
        verbose_name = 'Kontak Perusahaan'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return f'{self.telepon} - {self.email} - {self.alamat}'