from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import KonsultasiViewSet, ProyekViewSet, KlienViewSet, BiayaViewSet, KontakViewSet, GambarProyekViewSet, GambarViewSet

router = DefaultRouter()
router.register(r'konsultasi', KonsultasiViewSet)
router.register(r'proyek', ProyekViewSet)
router.register(r'klien', KlienViewSet)
router.register(r'Biaya', BiayaViewSet)
router.register(r'konsultasi', KontakViewSet)
router.register(r'konsultasi', GambarProyekViewSet)
router.register(r'konsultasi', GambarViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
