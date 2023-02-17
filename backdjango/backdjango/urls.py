from django.contrib import admin
from django.urls import include, path, re_path

urlpatterns = [
    path('api/', include('api.urls')),
]
