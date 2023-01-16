from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'api'

router = DefaultRouter()
router.register('user', views.UserViewSet)
router.register('reqterm', views.ReqtermViewSet)
router.register('product', views.ProductViewSet)
router.register('request', views.RequestViewSet)
router.register('category2', views.Category2ViewSet)
router.register('category1', views.Category1ViewSet)
router.register('order', views.OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
