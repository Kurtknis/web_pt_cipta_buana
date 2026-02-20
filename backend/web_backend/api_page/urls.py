from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ProjectViewSet, ClientViewSet, PriceViewSet, ContactViewSet, ImageProjectViewSet, HomeComparisonImageViewSet, HomePortfolioViewSet

router = DefaultRouter()
router.register(r'project', ProjectViewSet)
router.register(r'client', ClientViewSet)
router.register(r'price', PriceViewSet)
router.register(r'contact', ContactViewSet)
router.register(r'image_project', ImageProjectViewSet)
router.register(r'home_comparison', HomeComparisonImageViewSet)
router.register(r'home_portfolio', HomePortfolioViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
