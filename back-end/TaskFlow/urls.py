from django.urls import path, re_path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers
from .views import IniciarSesion, StatusViewSet, CategoryViewSet, TaskViewSet, UserViewSet, Registro

# Routers
router = routers.DefaultRouter()
router.register(r'status', StatusViewSet, basename='status')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'task', TaskViewSet, basename='task')
router.register(r'user', UserViewSet, basename='user')

# URL patterns
urlpatterns = [
    re_path('api/v1/registro', Registro.as_view(), name='registroUsuario'),
    path('api/v1/iniciar-sesion/', IniciarSesion.as_view(), name='iniciar_sesion'),  

    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/v1/', include(router.urls)),
]
