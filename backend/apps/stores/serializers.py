from rest_framework import serializers
from django.contrib.auth.models import User
from apps.products.models import Product

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'