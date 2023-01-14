from rest_framework.serializers import ModelSerializer
from .models import User, Reqterm

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ReqtermSerializer(ModelSerializer):
    class Meta:
        model = Reqterm
        fields = '__all__'