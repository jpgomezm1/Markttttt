from rest_framework import serializers
from apps.user.models import User 
from apps.products.models import Product, Inventory
from apps.user.serializers import UserClientSerializer

from .models import *


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    #address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    '''def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.address, many=False).data
        except:
            address = False
        return address'''

    def get_user(self, obj):
        user = obj.user
        serializer = UserClientSerializer(user, many=False)
        return serializer.data