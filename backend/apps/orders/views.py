from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from datetime import datetime

from apps.user.models import User
from apps.support import *
from apps.orders.serializers import *
from apps.lists.models import Addresses
from .models import *

from apps.products.models import Product,Inventory
from apps.products.forms import *

from django.contrib.auth.decorators import login_required, user_passes_test

#@login_required
@api_view(['POST'])
def add_order_items(request):
    user=get_user("ClienteEjemplo1@gmail.com")#ELIMINAR CUANDO YA NO USE POSTMAN
    #user=get_user(request.user)
    data=request.data
    
    #Crear Order
    order_items=data['order_items'] #IGUAL AL VIDEO
    if order_items and len(order_items)== 0:
        return Response({'detalle':'No Order Items'})
    else:
        order= Order.objects.create(
            user=user,
            payment_method=data['paymentMethod'],
            tax_price=data['taxPrice'],
            shipping_price=data['shippingPrice'],
            total_price=data['totalPrice']
        )
        print('CREA LA ORDER')
    # Crear Shipping Address
        address=Addresses.objects.get(id=int(data['shippingAddress']))
        shipping_address=ShippingAddress.objects.create(
            order=order,
            address=address,
            )
        print('shippingAddresAAAAAAA')
        for i in order_items:
            product=Product.objects.get(_id=i['product'])
            print(f'PRODODOODODOD {product.sizes}')
            if product.sizes=='No':
                item= OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    quantity=i['qty'],
                    price=i['price'],
                    #image=product.image.url
                )
                product_inventory=Inventory.objects.get(product=product)
                product_inventory.stock-=item.quantity
            else:
                item=OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    size=i['size'],
                    quantity=i['qty'],
                    price=i['price'],
                )
                print('ERROR ACA')
                product_inventory=Inventory.objects.get(product=product)
                product_inventory.size_stock[i['size']]-=i['qty']
            product_inventory.save()
    serializer=OrderSerializer(order,many=False)
    return Response(serializer.data)

#@login_required
@api_view(['GET'])
def get_order(request,order_id):

    user=get_user(email="ClienteEjemplo1@gmail.com")#ELIMINAR CUANDO YA NO USE POSTMAN
    #user=get_user(request.user)
    order=Order.objects.filter(user=user).get(_id=order_id)
    serializer=OrderSerializer(order,many=False)
    return Response(serializer.data)

#@login_required
@api_view(['PUT'])
def paid_order(request,order_id):
    order=Order.objects.get(_id=order_id)
    order.is_paid=True
    order.paid_at=datetime.now()
    order.save()

    return Response('la orden fue pagada')