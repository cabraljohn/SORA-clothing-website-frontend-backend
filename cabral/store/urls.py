from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register_user, name='register'),
    path('orders/create/', views.create_order, name='create-order'),
    path('profile/', views.get_user_profile, name='user-profile'),
] 