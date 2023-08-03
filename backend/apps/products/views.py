from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response

from .support import *

from apps.user.models import User
from apps.support import *

from apps.products.models import Product,Inventory
from apps.products.forms import *

from django.contrib.auth.decorators import login_required, user_passes_test

from .serializers import ProductsSerializer, InventorySerializer

from django.core.exceptions import ObjectDoesNotExist

from apps.lists.models import WishList
from apps.lists.serializers import WishListSeri

from rest_framework.permissions import IsAuthenticated

#All
@api_view(['GET'])
def get_store_products(request,store_id):
    '''metodo para obtener todos los productos de una tienda

    Args:
        request (): request de django
        store_id (): id de la tienda objetivo

    Returns:
        Response: devuelve los datos serializados de los produtctos encontrados
    '''
    user=User.objects.get(id=store_id)
    products= Product.objects.filter(user=user)
    serializer=ProductsSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def detail_product(request,store_id,product_id):
    '''metodo para ver a detalle toda la info de un producto

    Args:
        request (): django
        store_name (int): id de la tienda
        product_id (int): id del producto

    Returns:
        Response: Retorna Serializado todos los datos recibidos
    '''
    exists,serializer=product_exists(product_id,id=store_id)
    try:
        if exists:
            return Response(serializer.data)
        else:
            return Response({"mensaje":"no se encontró el producto buscado"})
    except:
        return Response({"ERROR":"no se encontró el producto buscado"})


@api_view(['GET'])
def get_all_products(request):
    '''metodo para obtener todas los productos existentes, luego podrá
    ser el metodo para obtener productos para la pagina principal

    Args:
        request (): django

    Returns:
        Response: Retorna Serializado todos los datos recibidos
    '''
    products= Product.objects.all()
    serializers=ProductsSerializer(products,many=True)
    return Response(serializers.data)

#Client

@permission_classes([IsAuthenticated])
@login_required
@api_view(['PUT'])
def add_product_to_wishlist(request,wishlist_id,product_id):
    '''Metodo de para poder añadir un producto a una wishlist en especifico

    Args:
        request (): django
        wishlist_id (int): id de la wishlist a modificar
        product_id (int): id del producto a eliminar de la wishlist

    Returns:
        Response: Retorna mensaje o error al momento de crear el producto
    '''
    user=get_user(request.user)
    wishlists=WishList.objects.filter(user=user)
    wishlist=wishlists.filter(_id=wishlist_id).first()
    if wishlist:#Existencia del wishlist
        try: #Existencia del producto
            product=Product.objects.get(_id=product_id)
        except ObjectDoesNotExist:
            return Response({'ERROR': 'El producto no existe'})
        wishlist.products.add(product)
        return Response({'message': 'Producto añadido correctamente a la wishlist'})
    return Response({'message': 'ERROR al añadir el producto ya que la wishlist no existe'})

@permission_classes([IsAuthenticated])
@login_required
@api_view(['PUT'])
def rm_product_from_wishlist(request,wishlist_id,product_id):
    '''Metodo de para poder eliminar un producto de la wishlist

    Args:
        request (): django
        wishlist_id (int): id de la wishlist a modificar
        product_id (int): id del producto a eliminar de la wishlist

    Returns:
        Response: Retorna mensaje o error al momento de eliminar el producto
    '''
    user=get_user(request.user)
    wishlist=WishList.objects.filter(user=user).filter(_id=wishlist_id).first()
    if wishlist:
        try: #Existencia del producto
            product=Product.objects.get(_id=product_id)
        except ObjectDoesNotExist:
            return Response({'ERROR': 'El producto no existe'})
        wishlist.products.remove(product)
        return Response({'message': 'Producto eliminado correctamente a la wishlist'})
    return Response({'message': 'ERROR al eliminar el producto ya que la wishlist no existe'})


#Seller

######CRUD Product
#@permission_classes([IsAuthenticated])
#@login_required
@api_view(['POST'])
def create_product(request):
    '''Crear producto y lo añade directamente al inventario con stock en 0

    Args:
        request (): django

    Returns:
        Response: Retorna mensaje o error al momento de crear el producto
    '''
    form=AddProductForm(request.data)
    user=get_user('VendedorEjemplo1@gmail.com') #ELIMINAR CUANDO YA NO USE POSTMAN
    #user=request.user
    #user=User.objects.get(email=user)
    if form.is_valid():
        product=form.save(commit=False)
        product.user=user #ELIMINAR CUANDO YA NO USE POSTMAN
        product.save()
        if request.data["sizes"][0]=='S':
            Inventory.objects.create( user=user, product=product,size_stock={"xs":0,"s":0,"m":0,"l":0,"xl":0}
            )
        else:
            Inventory.objects.create( user=user, product=product,stock=0)
        return Response({'message': 'Producto creado exitosamente'})
    else:
        return Response({'ERROR':form.errors})

#@permission_classes([IsAuthenticated])
#@login_required
@api_view(['PUT'])
def update_product(request, product_id):
    '''actualizar producto

    Args:
        request (): django
        product_id (int): id del producto

    Returns:
        Response: Retorna mensaje o error al momento de actualizar el producto el producto
    '''
    user="VendedorEjemplo1@gmail.com" #ELIMINAR CUANDO YA NO USE POSTMAN
    #user=get_user(request.user)
    exists,serializer=product_exists(product_id,email=user)
    if exists:
        product = Product.objects.get(_id=product_id)
        form = AddProductForm(request.data, instance=product)
        if form.is_valid():
            form.save()
            return Response({'message': 'Producto actualizado exitosamente'})
        else:
            return Response({'ERROR': 'No se pudo actualizar el producto'})
    else:
        return Response({'ERROR': 'Producto no encontrado'})

#@permission_classes([IsAuthenticated])
#@login_required
@api_view(['DELETE'])
def delete_product(request,product_id):
    '''Eliminar producto

    Args:
        request (): django
        product_id (int): id del producto

    Returns:
        Response: Retorna mensaje o error al momento de eliminar el producto
    '''
    user="VendedorEjemplo1@gmail.com" #ELIMINAR CUANDO YA NO USE POSTMAN
    #user=get_user(request.user)
    exists,serializer=product_exists(product_id,email=user)
    if exists:
        product = Product.objects.get(_id=product_id)
        product.delete()
        return Response({'message': 'Producto eliminado exitosamente'})
    """else:
        return Response({'ERROR': 'Producto no encontrado'})"""

#####FIN DEL CRUD

