from django.urls import include, path
from . import views

app_name = 'api'

urlpatterns = [
    path('document/', views.doc_find),
    path('document/<int:DOCNUM>', views.doc_detail),
    path('login/', views.login),
]
