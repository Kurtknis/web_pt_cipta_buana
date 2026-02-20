from django.db import models

# Create your models here.

class Consultation(models.Model):
    name = models.CharField(max_length=100, default='N/A')
    email = models.EmailField(max_length=200, default='N/A')
    contact = models.CharField(max_length=20, default='N/A')
    project = models.CharField(max_length=50, default='N/A')
    budget = models.CharField(max_length=50, default='N/A')
    timeline = models.CharField(max_length=50, default='N/A')
    description = models.TextField(default='N/A')
    submitted_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Consultation Data'
        verbose_name_plural = verbose_name
        ordering = ['-submitted_date']
        
    def __str__(self):
        return f'{self.name} - {self.project}'
