from rest_framework import serializers
from .models import Project, HomePortfolio, HomeComparisonImage, ImageProject, Furniture, Price, Client, Contact

class ProjectSerializers(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        
class HomePortfolioSerializers(serializers.ModelSerializer):
    class Meta:
        model = HomePortfolio
        fields = '__all__'
        
class ImageProjectSerializers(serializers.ModelSerializer):
    class Meta:
        model = ImageProject
        fields = '__all__'
        
class PriceSerializers(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = '__all__'
        
class HomeComparisonImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = HomeComparisonImage
        fields = '__all__'
        
class FurnitureSerializers(serializers.ModelSerializer):
    class Meta:
        model = Furniture
        fields = '__all__'

class ClientSerializers(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
        
class ContactSerializers(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'