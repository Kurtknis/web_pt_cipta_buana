from rest_framework import viewsets
from .models import Konsultasi
from .serializers import KonsultasiSerializers
import os
from django.http import HttpResponse
from django.conf import settings

class KonsultasiViewSet(viewsets.ModelViewSet):
    queryset = Konsultasi.objects.all()
    serializer_class = KonsultasiSerializers
    