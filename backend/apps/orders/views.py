from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response


from apps.user.models import User
from apps.support import *
from apps.orders.serializers import *
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
    '''filter_data={}
    for field, data_list in data.items():
            filter_data[field] = data_list[0]
    print(filter_data)'''
    
    #Crear Order
    #order_items=filter_data #NO ES IGUAL AL VIDEO
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
        shipping_address=ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postal_code=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            )
        
        for i in order_items:
            product=Product.objects.get(_id=i['product'])
            
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
            product_inventory.save()
    print('LLEGAAA')
    serializer=OrderSerializer(order,many=False)
    print(serializer)
    return Response(serializer.data)