# from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.viewsets import ModelViewSet
from .models import User, Reqterm, Request, Product, Category2, Category1, Order
from .serializers import UserSerializer, ReqtermSerializer, RequestSerializer, ProductSerializer, Category2Serializer, \
    Category1Serializer, OrderSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
class ReqtermViewSet(ModelViewSet):
    queryset = Reqterm.objects.all()
    serializer_class = ReqtermSerializer

class RequestViewSet(ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
        SearchFilter,
    ]

    filterset_fields = ["reqnum"]
    ordering_fields = ["usernum", "reqdate", "reqnum"]
    search_fields = ['termyearmonth__termyearmonth', 'usernum__username', 'reqstate', 'prodnum__prodname']

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class Category2ViewSet(ModelViewSet):
    queryset = Category2.objects.all()
    serializer_class = Category2Serializer

class Category1ViewSet(ModelViewSet):
    queryset = Category1.objects.all()
    serializer_class = Category1Serializer