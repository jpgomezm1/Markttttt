from rest_framework import serializers
from .models import *

class UserClientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Client
        fields='first_name','last_name','email','phone_number'
        

class UserSellerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seller
        fields='id','store_name','email','phone_number','social_media'