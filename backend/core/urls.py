from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ModuleViewSet, FeatureViewSet, ContactAPIView

router = DefaultRouter()
router.register(r'modules', ModuleViewSet)
router.register(r'features', FeatureViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', ContactAPIView.as_view(), name='contact'),
]
