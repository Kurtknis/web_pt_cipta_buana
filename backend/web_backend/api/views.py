from rest_framework import viewsets
from .models import Konsultasi
from .serializers import KonsultasiSerializers

class KonsultasiViewSet(viewsets.ModelViewSet):
    queryset = Konsultasi.objects.all()
    serializer_class = KonsultasiSerializers