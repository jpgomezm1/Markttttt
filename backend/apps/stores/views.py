from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.products.models import Product

from .serializers import ProductsSerializer

@api_view(['GET'])
def get_products(request):
    products= Product.objects.all()
    serializers=ProductsSerializer(products,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def get_product(request,pk):
    try:
        products= Product.objects.get(_id=pk)
        serializer=ProductsSerializer(products,many=False)
        return Response(serializer.data)
    except:
        return Response({"mensaje":"no se encontró el producto buscado"})
    

#VISTAS PARA CLIENTE

#VISTAS PARA VENDEDOR
