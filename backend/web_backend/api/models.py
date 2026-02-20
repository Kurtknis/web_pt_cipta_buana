from json import JSONEncoder
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

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
    
class HomePortfolio(models.Model):
    title = models.CharField(blank=True, null=True)
    category = models.CharField(default='-')
    image = models.ImageField(upload_to='home_portfolio/')
    description = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name = 'Home Portfolio'
        verbose_name_plural = verbose_name
    
    def save(self, *args, **kwargs):
        if not self.alt:
            self.alt = f'{self.image} Image'
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'image {self.alt}'
    
class HomeComparisonImage(models.Model):
    before = models.ImageField(upload_to='home_comparison/')
    after = models.ImageField(upload_to='home_comparison/')
    title = models.CharField(blank=True, null=True, default='-')
    description = models.TextField(blank=True, null=True, default='-')
    
    class Meta:
        verbose_name = 'Home Comparison Image'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return self.title
    
class Project(models.Model):
    title = models.CharField(max_length=100)
    location = models.CharField(blank=True, null=True, default='-')
    year = models.IntegerField(blank=True, null=True, default='-')
    category = models.CharField(blank=True, null=True, default='-')
    description = models.TextField(blank=True, null=True, default='-')
    price = models.IntegerField(blank=True, null=True, default='-')
    duration = models.CharField(blank=True, null=True, default='-')
    client = models.CharField(blank=True, null=True, default='-')
    features = models.TextField(blank=True, null=True, default='-')
    challenges = models.CharField(blank=True, null=True, default='-')
    solution = models.CharField(blank=True, null=True, default='-')
    awards = models.TextField(blank=True, null=True, default='-')
    testimonial = models.CharField(blank=True, null=True, default='-')
    clientRating = models.IntegerField(blank=True, null=True, default='-')
    
    class Meta:
        verbose_name = 'Project List'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return self.title
    
class ImageProject(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='image')
    image = models.ImageField(upload_to='project_image/')
    alt = models.CharField(blank=True, null=True)
    
    class Meta:
        verbose_name = 'Project Gallery'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return f'image {self.project}'
    
class Furniture(models.Model):
    title = models.CharField()
    category = models.CharField(blank=True, null=True, default='-')
    description = models.TextField(blank=True, null=True, default='-')
    price = models.CharField(blank=True, null=True, default='-')
    
    class Meta:
        verbose_name = 'Furniture List'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return f'{self.category} - {self.title} - {self.price}'
    
class Price(models.Model):
    sqmin = models.IntegerField(blank=True, null=True, default='-')
    sqmax = models.IntegerField(blank=True, null=True, default='-')
    price = models.CharField(max_length=50, blank=True, null=True, default='-')
    description = models.TextField(blank=True, null=True, default='-')
    
    class Meta:
        verbose_name = 'Price List (per m²)'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return f'{self.size} - {self.price}'
    
class Client(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, blank=True, null=True, default='-')
    location = models.CharField(max_length=100, blank=True, null=True, default='-')
    budget = models.CharField(max_length=50, blank=True, null=True, default='-')
    project = models.CharField(max_length=100, blank=True, null=True, default='-')
    rating = models.CharField(max_length=10, blank=True, null=True, default='-')
    testimonial = models.TextField(blank=True, null=True, default='-')
    
    
    class Meta:
        verbose_name = 'Client List'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return f'{self.nama} - {self.role}'
    
class Contact(models.Model):
    phone = PhoneNumberField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.CharField(blank=True, null=True, max_length=200)
    url = models.URLField(blank=True, null=True)
    
    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return f'{self.phone} - {self.email} - {self.address}'