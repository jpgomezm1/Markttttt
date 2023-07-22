from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.user.models import User
from apps.support import *

from apps.products.models import Product,Inventory
from apps.products.forms import *

from django.contrib.auth.decorators import login_required, user_passes_test

from .serializers import ProductsSerializer, InventorySerializer

#METODOS DE SOPORTE QUE SE PUEDEN USAR EN DIFERENTES ARCHIVOS DE PY

def product_exists(store_name,product_id):
    '''metodo para definir si el producto existe

    Args:
        store_id (int): id de la tienda
        product_id (int): id del producto

    Returns:
        Bool: True si si existe
        serializer: para devolver la info del producto
    '''
    try: 
        user=User.objects.get(store_name=store_name)
        store_products= Product.objects.filter(user=user)
        product= store_products.get(_id=product_id)
        if product:
            serializer=ProductsSerializer(product,many=False)
            return True,serializer
        else:
            return False,0
    except:
        return False,0

def product_availability(store_id,product_id):
    '''metodo para ver la disponibilidad de un producto

    Args:
        store_id (int): id de la tienda
        product_id (int): id del producto

    Returns:
        Bool: True si hay mas de 0 del producto
        int: Retorna la cantidad que hay del producto
    '''
    exists,serializer=product_exists(store_id,product_id)
    if exists:
        inventory_products= Inventory.objects.filter(user=store_id)
        product=inventory_products.get(product=product_id)
        stock=product.stock
        print(f'hay {stock} de este producto')
        if stock>0:
            return True,stock
        else:
            return False
    else:
        #el producto no existe
        return False