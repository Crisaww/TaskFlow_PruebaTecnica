from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.generic import RedirectView


from .models import Status, Category, Task
from .serializer import StatusSerializer, CategorySerializer, TaskSerializer, UserSerializer

User = get_user_model()


# --- AUTENTICACIÓN ---
class IniciarSesion(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            identifier = request.data.get('identifier')
            password = request.data.get('password')

            if not identifier or not password:
                return Response(
                    {'error': 'Credenciales incompletas.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                user = User.objects.get(Q(email=identifier) | Q(username=identifier))
            except User.DoesNotExist:
                return Response(
                    {'error': 'Usuario no encontrado.'},
                    status=status.HTTP_404_NOT_FOUND
                )

            if not user.check_password(password):
                return Response(
                    {'error': 'Contraseña incorrecta.'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print("Error en IniciarSesion:", e)
            return Response(
                {'error': 'Error interno del servidor.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class Registro(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            # Generar tokens JWT
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({
                'refresh': refresh_token,
                'access': access_token,
                'message': 'Registro exitoso.',
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_201_CREATED)

        # Errores personalizados
        if 'username' in serializer.errors:
            return Response({'error': 'El nombre de usuario ya está en uso.'},
                            status=status.HTTP_400_BAD_REQUEST)
        if 'email' in serializer.errors:
            return Response({'error': 'El correo electrónico ya está en uso.'},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Redireccionamiento a Registro Usuario 
class RedirigirRegistro(RedirectView):
    url = '/RegistroUsuario.html'  
    permanent = False

# --- VIEWSETS ---
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    permission_classes = [permissions.IsAuthenticated]


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.filter(owner=self.request.user)
        category_id = self.request.query_params.get('category_id')
        status_id = self.request.query_params.get('status_id')

        if category_id:
            queryset = queryset.filter(category_id=int(category_id))
        if status_id:
            queryset = queryset.filter(status_id=int(status_id))

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
