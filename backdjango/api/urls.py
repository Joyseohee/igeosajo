from django.urls import include, path
from . import views

app_name = 'api'

urlpatterns = [
    # path('user/', views.UserView),
    path('request', views.request_view),
    path('reqterm/<int:pk>', views.reqterm_view),
]

