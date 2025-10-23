from django.conf import settings
from django.db import models

# Modelos requeridos---

class Status(models.Model):
    # Definimos los posibles estados de una tarea
    PENDIENTE = 'Pendiente'
    EN_PROGRESO = 'En progreso'
    COMPLETADA = 'Completada'
    CANCELADA = 'Cancelada'

    STATUS_CHOICES = [
        (PENDIENTE, 'Pendiente'),
        (EN_PROGRESO, 'En progreso'),
        (COMPLETADA, 'Completada'),
        (CANCELADA, 'Cancelada'),
    ]

    # Campo principal del modelo
    name = models.CharField(max_length=20, choices=STATUS_CHOICES, unique=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="categories")

    def __str__(self):
        return self.name


class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tasks")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.ForeignKey(Status, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
