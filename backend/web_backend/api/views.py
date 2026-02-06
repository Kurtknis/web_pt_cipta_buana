from rest_framework import viewsets
from .models import Konsultasi
from .serializers import KonsultasiSerializers
import os
from django.http import HttpResponse
from django.conf import settings

class KonsultasiViewSet(viewsets.ModelViewSet):
    queryset = Konsultasi.objects.all()
    serializer_class = KonsultasiSerializers
    

def frontend(request):
    index_path = os.path.join(settings.STATIC_ROOT, "index.html")
    with open(index_path, encoding="utf-8") as f:
        return HttpResponse(f.read())
