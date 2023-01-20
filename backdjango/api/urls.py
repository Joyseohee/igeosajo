from django.urls import include, path
from . import views

app_name = 'api'

urlpatterns = [
    path('test/', views.UserView),
    path('order/', views.OrderView),
    path('doc/', views.DocView),
]
