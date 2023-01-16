from rest_framework import serializers
from .models import User, Reqterm, Category1, Category2, Request, Product, Order

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class ReqtermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reqterm
        fields = '__all__'
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class Category2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Category2
        fields = '__all__'
class Category1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Category1
        fields = '__all__'