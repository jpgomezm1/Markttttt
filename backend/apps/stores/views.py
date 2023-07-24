from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.products.models import Product

from .serializers import StoresSerializer
from apps.user.models import Seller

@api_view(['GET'])
def get_stores(request):
    stores=Seller.objects.filter(role="SELLER")
    serializer=StoresSerializer(stores,many=True)
    return Response(serializer.data)
    

#VISTAS PARA CLIENTE

#VISTAS PARA VENDEDOR
