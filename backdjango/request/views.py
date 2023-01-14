# from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import User, Reqterm
from .serializers import UserSerializer, ReqtermSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class ReqtermViewSet(ModelViewSet):
    queryset = Reqterm.objects.all()
    serializer_class = ReqtermSerializer

