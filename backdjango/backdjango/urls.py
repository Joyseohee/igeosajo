
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('approval/', include('approval.urls')),
    path('buy/', include('buy.urls')),
    path('order/', include('order.urls')),
    path('request/', include('request.urls')),
]
