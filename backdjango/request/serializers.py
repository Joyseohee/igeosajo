from rest_framework import serializers
from .models import User, Reqterm, Category1, Category2, Request, Product, Order


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class ReqtermSerializer(serializers.ModelSerializer):
    # 외래키로 참조
    username = serializers.ReadOnlyField(source='usernum.username')
    userdept = serializers.ReadOnlyField(source='usernum.userdept')
    class Meta:
        model = Reqterm
        fields = [
            'termyearmonth',
            'username',
            'userdept',
        ]
class OrderSerializer(serializers.ModelSerializer):
    # 외래키로 참조
    prodname = serializers.ReadOnlyField(source='reqnum.prodnum.prodname')
    class Meta:
        model = Order
        fields = [
            'ordernum',
            'reqnum',
            'orderdate',
            'orderaddr',
            'prodname',
        ]
class RequestSerializer(serializers.ModelSerializer):
    # 외래키로 참조
    username = serializers.ReadOnlyField(source='usernum.username')
    prodname = serializers.ReadOnlyField(source='prodnum.prodname')
    prodprice = serializers.ReadOnlyField(source='prodnum.prodprice')
    class Meta:
        model = Request
        fields = [
            'reqnum',
            'prodnum',
            'prodname',
            'prodprice',
            'reqcount',
            'reqprice',
            'reqstate',
            'reqdate',
            'reqcancled',
            'termyearmonth',
            'usernum',
            'username',
        ]

class ProductSerializer(serializers.ModelSerializer):
    # 외래키로 참조
    category2name = serializers.ReadOnlyField(source='category2.category2name')
    category1name = serializers.ReadOnlyField(source='category2.category1.category1name')
    class Meta:
        model = Product
        fields = [
            'prodnum',
            'prodname',
            'prodprice',
            'category2name',
            'category1name',
        ]

class Category2Serializer(serializers.ModelSerializer):
    # 외래키로 참조
    category1name = serializers.ReadOnlyField(source='category1.category1name')
    class Meta:
        model = Category2
        fields = [
            'category2',
            'category2name',
            'category1',
            'category1name',
        ]


class Category1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Category1
        fields = '__all__'