from rest_framework import serializers
from .models import User, Reqterm, Category1, Category2, Request, Product, Order, Doc, Cart


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
    username = serializers.ReadOnlyField(source='usernum.username')
    prodname = serializers.ReadOnlyField(source='prodnum.prodname')
    prodprice = serializers.ReadOnlyField(source='prodnum.prodprice')

    class Meta:
        model = Request
        # fields = '__all__'
        fields = ['reqnum','prodnum','prodname', 'prodprice','reqcount','reqprice','reqdate','reqapvdate','reqstate','reqstaging','reqrejectreason','reqcancled','usernum','username','termyearmonth',]


class ProductSerializer(serializers.ModelSerializer):
    # category1code = serializers.ReadOnlyField(source='category2code.category1code')
    class Meta:
        model = Product
        fields = ['prodnum', 'prodname', 'prodprice', 'prodimg', 'category2code', ]


class Category2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Category2
        fields = '__all__'


class Category1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Category1
        fields = '__all__'

class DocSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doc
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
