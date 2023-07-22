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

#Inventory
#@login_required
#@user_passes_test(is_seller)
@api_view(['GET'])
def get_inventory(request):
    #user=request.user
    user=2
    inventory_products=Inventory.objects.filter(user=user)
    print(inventory_products)
    serializers=InventorySerializer(inventory_products,many=True)
    print(serializers.data)
    return Response(serializers.data)

#Inventory
#@login_required
#@user_passes_test(is_seller)
@api_view(['GET','PUT'])
def update_inventory_product(request,product_id):
    store_name='Tienda1'#ELIMINAR CUANDO YA NO USE POSTMAN
    exists,serializer=product_exists(store_name,product_id)
    if exists:
        print('existeeeee')
        inventory=Inventory.objects.get(product=product_id)
        if request.method=='PUT':
            form=InventoryUpdateForm(request.data,instance=inventory)
            if form.is_valid():
                form.save()
                return Response({'message': 'Stock actualizado exitosamente'})
            else:
                return Response({'ERROR': 'No se pudo actualizar el Stock'})
        else:
            form=AddProductForm(instance=inventory)
            return Response({'Mensaje': 'si es get devuelvo el formulario'})
    else:
        return Response({'ERROR': 'Producto no encontrado'})