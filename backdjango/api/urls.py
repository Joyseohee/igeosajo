from django.urls import include, path
from . import views

app_name = 'api'

urlpatterns = [
    path('cart', views.cart_view),
    path('product', views.product_view),
    # path('test2/', views.User2View),
    # path('test3/<int:usernum>/', views.CartDeleteView),
    path('post_request', views.post_request),
    path('delete_request', views.delete_request),

    path('token/', views.accesstoken),
]
