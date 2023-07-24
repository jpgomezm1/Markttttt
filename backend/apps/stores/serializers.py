from rest_framework import serializers
from django.contrib.auth.models import User
from apps.user.models import Seller

class StoresSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seller
        fields='store_name','category','social_media','logo'