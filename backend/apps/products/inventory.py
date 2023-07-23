from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.user.models import User
from apps.support import *

from apps.products.models import Product,Inventory
from apps.products.forms import *

from django.contrib.auth.decorators import login_required, user_passes_test

from .serializers import ProductsSerializer, InventorySerializer

from .support import *

import json

#Inventory
#@login_required
#@user_passes_test(is_seller)
@api_view(['GET'])
def get_inventory(request):
    user=get_user("VendedorEjemplo1@gmail.com") #ELIMINAR CUANDO YA NO USE POSTMAN
    #user=get_user(request.user)
    inventory_products=Inventory.objects.filter(user=user)
    print(inventory_products)
    serializers=InventorySerializer(inventory_products,many=True)
    print(serializers.data)
    return Response(serializers.data)

#Inventory
#@login_required
#@user_passes_test(is_seller)
@api_view(['PUT'])
def update_inventory_product(request,product_id):
    user=get_user("VendedorEjemplo1@gmail.com") #ELIMINAR CUANDO YA NO USE POSTMAN
    #user=get_user(request.user)
    exists,serializer=product_exists(product_id,email=user)
    if exists:
        product=Product.objects.get(_id=product_id)
        inventory=Inventory.objects.get(product=product_id)
        if product.sizes=='Si':
            form =InventoryUpdateSizeStockForm(request.data,instance=inventory)
            sum=0
            data=json.loads(request.data['size_stock'])
            for key in data:
                value=data.get(key)
                sum+=int(value)
            inventory.stock=sum
        else:
            form=InventoryUpdateStockForm(request.data,instance=inventory)
        if form.is_valid():
            form.save()
            return Response({'message': 'Stock actualizado exitosamente'})
        else:
            return Response({'ERROR': form.errors})
    else:
        return Response({'ERROR': 'Producto no encontrado'})