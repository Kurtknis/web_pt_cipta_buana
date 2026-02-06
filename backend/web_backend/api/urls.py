from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import KonsultasiViewSet

router = DefaultRouter()
router.register(r'konsultasi', KonsultasiViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
