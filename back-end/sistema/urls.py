from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve



urlpatterns = [
    path('admin/', admin.site.urls),
    path('TaskFlow/', include('TaskFlow.urls')),

    # Redirige a la página principal
    path('', RedirectView.as_view(url='/static/RegistroUsuario.html', permanent=False)),

    # 👇 Esto sirve los archivos del front-end (HTML, CSS, JS)
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATICFILES_DIRS[0]}),
]

