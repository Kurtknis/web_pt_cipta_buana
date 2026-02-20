from .models import Konsultasi, Proyek, GambarProyek, Biaya, Klien, Kontak, Gambar
from .serializers import KonsultasiSerializers, ProyekSerializers, GambarSerializers, GambarProyekSerializers, BiayaSerializers, KlienSerializers, KontakSerializers
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

class KonsultasiViewSet(viewsets.ModelViewSet):
    queryset = Konsultasi.objects.all()
    serializer_class = KonsultasiSerializers

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ProyekViewSet(viewsets.ModelViewSet):
    queryset = Proyek.objects.all()
    serializer_class = ProyekSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('proyek_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('proyek_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('proyek')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('proyek',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('proyek_list')
        cache.delete('proyek')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('proyek_list')
        cache.delete('proyek')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('proyek_list')
        cache.delete('proyek')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('proyek_list')
        cache.delete('proyek')
        return response
        
class GambarViewSet(viewsets.ModelViewSet):
    queryset = Gambar.objects.all()
    serializer_class = GambarSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('gambar_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('gambar_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('gambar')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('gambar',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('gambar_list')
        cache.delete('gambar')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('gambar_list')
        cache.delete('gambar')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('gambar_list')
        cache.delete('gambar')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('gambar_list')
        cache.delete('gambar')
        return response

class GambarProyekViewSet(viewsets.ModelViewSet):
    queryset = GambarProyek.objects.all()
    serializer_class = GambarProyekSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('gp_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('gp_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('gp')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('gp',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('gp_list')
        cache.delete('gp')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('gp_list')
        cache.delete('gp')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('gp_list')
        cache.delete('gp')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('gp_list')
        cache.delete('gp')
        return response
    
class BiayaViewSet(viewsets.ModelViewSet):
    queryset = Biaya.objects.all()
    serializer_class = BiayaSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('biaya_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('biaya_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('biaya')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('biaya',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('biaya_list')
        cache.delete('biaya')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('biaya_list')
        cache.delete('biaya')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('biaya_list')
        cache.delete('biaya')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('biaya_list')
        cache.delete('biaya')
        return response
    
class KlienViewSet(viewsets.ModelViewSet):
    queryset = Klien.objects.all()
    serializer_class = KlienSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('klien_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('klien_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('klien')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('klien',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('klien_list')
        cache.delete('klien')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('klien_list')
        cache.delete('klien')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('klien_list')
        cache.delete('klien')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('klien_list')
        cache.delete('klien')
        return response
    
class KontakViewSet(viewsets.ModelViewSet):
    queryset = Kontak.objects.all()
    serializer_class = KontakSerializers
    
    def list(self, request, *args, **kwargs):
        data = cache.get('kontak_list')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('kontak_list',response.data, timeout=3600*24*7)
        return response
    
    def retrieve(self, request, *args, **kwargs):
        data = cache.get('kontak')
        if data:
            return Response(data)
        response = super().list(request, *args, **kwargs)
        cache.set('kontak',response.data, timeout=3600*24*7)
        return response
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('kontak_list')
        cache.delete('kontak')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('kontak_list')
        cache.delete('kontak')
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        cache.delete('kontak_list')
        cache.delete('kontak')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('kontak_list')
        cache.delete('kontak')
        return response