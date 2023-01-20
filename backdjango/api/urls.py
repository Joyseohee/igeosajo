from django.urls import include, path
from . import views

app_name = 'api'

urlpatterns = [
    path('order/', views.OrderView),
]
