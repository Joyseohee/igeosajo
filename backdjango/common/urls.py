from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'common'

router = DefaultRouter()
router.register('user', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
