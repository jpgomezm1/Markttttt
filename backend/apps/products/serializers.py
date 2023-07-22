from rest_framework import serializers
from apps.user.models import User 
from apps.products.models import Product, Inventory

class ProductsSerializer(serializers.ModelSerializer):
    '''Serializador para devolver todos los datos del producto
    
    Args:
        serializers (): automatico

    Returns:
        _type_: _description_
    '''
    user = serializers.SerializerMethodField()
    class Meta:
        model=Product
        fields='__all__'
    def get_user(self, obj):
        return obj.user.store_name

class ProductSerializerShow(serializers.ModelSerializer):
    '''Serializador que muestra los datos importantes para mostrar cuando
    esté minimizado

    Args:
        serializers (): automatico

    Returns:
        _type_: _description_
    '''
    class Meta:
        model=Product
        fields='name','image','rating','price'

class InventorySerializer(serializers.ModelSerializer):
    '''Serializador del inventario, devuelve todos los datos de los productos del inventario

    Args:
        serializers (): automatico

    Returns:
        _type_: _description_
    '''
    user = serializers.SerializerMethodField()
    product=serializers.SerializerMethodField()
    #image=serializers.SerializerMethodField() #TODAVIA NO ESTÁ LISTO
    class Meta:
        model=Inventory
        fields='__all__'
    
    def get_user(self, obj):
        return obj.user.store_name

    def get_product(self, obj):
        return obj.product.name
    
    def get_image(self,obj):
        return obj.product.image