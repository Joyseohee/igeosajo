from django.urls import include, path, re_path
from . import views

app_name = 'api'

urlpatterns = [
    path('request', views.request_view),
    path('request/<int:pk>', views.request_pk_view),
    path('reqterm', views.reqterm_view),
    path('reqterm/<int:pk>', views.reqterm_pk_view),
    path('cart', views.cart_view),
    path('product', views.product_view),
    path('order/', views.order_view),
    path('login/', views.login),
    path('token/', views.accesstoken),
]
