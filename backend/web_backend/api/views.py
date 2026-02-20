from .models import Consultation, Project, ImageProject, Price, Client, Contact, HomeComparisonImage, HomePortfolio
from .serializers import ConsultationSerializers, ProjectSerializers, HomeComparisonImageSerializers, ImageProjectSerializers, PriceSerializers, HomePortfolioSerializers, ClientSerializers, ContactSerializers
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializers

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('Project_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('Project_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('Project')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('Project',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('Project_list')
        cache.delete('Project')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('Project_list')
        cache.delete('Project')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('Project_list')
        cache.delete('Project')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('Project_list')
        cache.delete('Project')
        return response
        
class HomeComparisonImageViewSet(viewsets.ModelViewSet):
    queryset = HomeComparisonImage.objects.all()
    serializer_class = HomeComparisonImageSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('HomeComparisonImage_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('HomeComparisonImage_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('HomeComparisonImage')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('HomeComparisonImage',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('HomeComparisonImage_list')
        cache.delete('HomeComparisonImage')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('HomeComparisonImage_list')
        cache.delete('HomeComparisonImage')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('HomeComparisonImage_list')
        cache.delete('HomeComparisonImage')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('HomeComparisonImage_list')
        cache.delete('HomeComparisonImage')
        return response

class ImageProjectViewSet(viewsets.ModelViewSet):
    queryset = ImageProject.objects.all()
    serializer_class = ImageProjectSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('ImageProject_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('ImageProject_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('ImageProject')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('ImageProject',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('ImageProject_list')
        cache.delete('ImageProject')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('ImageProject_list')
        cache.delete('ImageProject')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('ImageProject_list')
        cache.delete('ImageProject')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('ImageProject_list')
        cache.delete('ImageProject')
        return response
    
class PriceViewSet(viewsets.ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('Price_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('Price_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('Price')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('Price',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('Price_list')
        cache.delete('Price')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('Price_list')
        cache.delete('Price')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('Price_list')
        cache.delete('Price')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('Price_list')
        cache.delete('Price')
        return response
    
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('Client_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('Client_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('Client')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('Client',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('Client_list')
        cache.delete('Client')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('Client_list')
        cache.delete('Client')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('Client_list')
        cache.delete('Client')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('Client_list')
        cache.delete('Client')
        return response
    
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('Contact_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('Contact_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('Contact')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('Contact',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('Contact_list')
        cache.delete('Contact')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('Contact_list')
        cache.delete('Contact')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('Contact_list')
        cache.delete('Contact')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('Contact_list')
        cache.delete('Contact')
        return response
    
class HomePortfolioViewSet(viewsets.ModelViewSet):
    queryset = HomePortfolio.objects.all()
    serializer_class = HomePortfolioSerializers()
    
    def list(self, request, *args, **kwargs):
        data = cache.get('HomePortfolio_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('HomePortfolio_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('HomePortfolio')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('HomePortfolio',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('HomePortfolio_list')
        cache.delete('HomePortfolio')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('HomePortfolio_list')
        cache.delete('HomePortfolio')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('HomePortfolio_list')
        cache.delete('HomePortfolio')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('HomePortfolio_list')
        cache.delete('HomePortfolio')
        return response