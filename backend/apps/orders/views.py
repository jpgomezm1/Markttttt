from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.lists.models import Addresses
from apps.orders.serializers import *
from apps.products.models import Inventory,Product
from apps.products.forms import *
from apps.support import *
from apps.user.models import User

from datetime import datetime

from .models import *


#ALL 
#Client
@permission_classes([IsAuthenticated])
@login_required
@seller_required(is_client)
@api_view(['POST'])
def add_order_items(request):
    try:
        #user=get_user("ClienteEjemplo1@gmail.com")#ELIMINAR CUANDO YA NO USE POSTMAN
        user=get_user(request.user)
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
            for i in order_items:
                product=Product.objects.get(id=i['product'])
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
                    product_inventory=Inventory.objects.get(product=product)
                    product_inventory.stock[i['size']]-=i['qty']
                product_inventory.save()
        serializer=OrderSerializer(order,many=False)
        return Response(serializer.data)
    except Exception as e:
        return get_error(e)

#@login_required
@api_view(['GET'])
def get_order(request,order_id):
    try:
        #user=get_user(email="ClienteEjemplo1@gmail.com")#ELIMINAR CUANDO YA NO USE POSTMAN
        user=get_user(request.user)
        order=Order.objects.filter(user=user).get(id=order_id)
        serializer=OrderSerializer(order,many=False)
        return Response(serializer.data)
    except Exception as e:
        return get_error(e)
#@login_required
@api_view(['PUT'])
def paid_order(request,order_id):
    try:
        order=Order.objects.get(id=order_id)
        order.is_paid=True
        order.paid_at=datetime.now()
        order.save()

        return Response('la orden fue pagada')
    except Exception as e:
        return get_error(e)