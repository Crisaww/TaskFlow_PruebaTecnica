from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Status, Category, Task

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


# --- STATUS ---
class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('id', 'name')


# --- CATEGORY ---
class CategorySerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)  # ← muestra datos del usuario

    class Meta:
        model = Category
        fields = ('id', 'name', 'owner')


# --- TASK ---
class TaskSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    # Lectura: serializer anidado para mostrar nombre
    category = CategorySerializer(read_only=True)
    status = StatusSerializer(read_only=True)

    # Escritura: slug/id para crear/editar
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    status_id = serializers.PrimaryKeyRelatedField(
        queryset=Status.objects.all(), source='status', write_only=True
    )

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'owner',
            'category', 'category_id',
            'status', 'status_id',
            'created_at', 'updated_at'
        ]

