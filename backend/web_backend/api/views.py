from rest_framework import viewsets
from .models import Konsultasi, Proyek, GambarProyek, Biaya, Klien, Kontak
from .serializers import KonsultasiSerializers, ProyekSerializers, GambarProyekSerializers, BiayaSerializers, KlienSerializers, KontakSerializers
from rest_framework.response import Response
from rest_framework import status

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
    
class GambarProyekViewSet(viewsets.ModelViewSet):
    queryset = GambarProyek.objects.all()
    serializer_class = GambarProyekSerializers
    
class BiayaViewSet(viewsets.ModelViewSet):
    queryset = Biaya.objects.all()
    serializer_class = BiayaSerializers
    
class KlienViewSet(viewsets.ModelViewSet):
    queryset = Klien.objects.all()
    serializer_class = KlienSerializers
    
class KontakViewSet(viewsets.ModelViewSet):
    queryset = Kontak.objects.all()
    serializer_class = KontakSerializers