from rest_framework import viewsets
from .models import Konsultasi
from .serializers import KonsultasiSerializers
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
