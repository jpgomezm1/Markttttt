from rest_framework import serializers
from django.contrib.auth.models import User
from apps.lists.models import *

class FavSeller(serializers.ModelSerializer):
    user= serializers.SerializerMethodField()
    user_seller = serializers.SerializerMethodField()
    class Meta:
        model=FavoriteCompanies
        fields='user','user_seller'
    
    def get_user(self,obj):
        return obj.user.email
    def get_user_seller(self, obj):
        return obj.user_seller.store_name
    
class WishListSeri(serializers.ModelSerializer):

    class Meta:
        model=WishList
        fields='__all__'

class AddressSerializer(serializers.ModelSerializer):
    user= serializers.SerializerMethodField()
    class Meta:
        model=Addresses
        fields='__all__'
    
    def get_user(self,obj):
        return obj.user.email