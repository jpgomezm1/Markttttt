from typing import Any
from django.views import View

from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.decorators import login_required, user_passes_test

from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.user.models import User
from apps.support import *
from apps.products.models import Product,Inventory
from apps.products.forms import *
from apps.lists.models import WishList
from apps.lists.serializers import WishListSeri

from .support import *
from .serializers import ProductsSerializer, InventorySerializer

from abc import ABC, abstractmethod
class Product(ABC):
    name=''
    description=''
    price=''

    def __init__(self, owner_email,id):
        self.owner_email=owner_email
        self.id=id
    
    @abstractmethod
    def get_user_owner(self):
        """Metodo para obtener el Dueño/Vendedor del producto
        """
        pass

    @abstractmethod
    def get_id(self):
        """Metodo para obtener el id del producto
        """
        pass
    
    @abstractmethod
    def get_name(self):
        """Metodo para obtener el nombre del producto
        """
        pass

    @abstractmethod
    def get_description(self):
        """Metodo para obtener la descripcion del producto
        """
        pass

    @abstractmethod
    def get_price(self):
        """Metodo para obtener el precio del producto
        """
        pass

    @abstractmethod
    def delete_product(self):
        """Metodo para elimnar el producto
        """
        pass

class SizedClotheProduct(Product):
    #Atributos
    #Constructor
    def __init__(self, owner_email,size):
        super().__init__(owner_email)
        self.size=size
        self.owner=get_user(owner_email)

    def get_user_owner(self):
        return self.owner
    
    def get_id(self):
        return self.owner