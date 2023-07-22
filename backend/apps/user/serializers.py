from rest_framework import serializers
from apps.user.models import User 
from .models import *

class UserClientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Client
        fields='first_name','last_name','email','phone_number'
        

class UserSellerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seller
        fields='store_name','email','phone_number','social_media'