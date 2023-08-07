from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.serializers import ListSerializer

from .models import *
from .forms import *

from apps.user.models import User
from apps.support import *

from apps.products.models import Product
from apps.products.forms import *

from django.contrib.auth.decorators import login_required, user_passes_test

from apps.products.serializers import *

from rest_framework.permissions import IsAuthenticated

from .serializers import *

#FAVORITE SELLERS

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['GET'])
def get_fav_sellers(request):
    '''Metodo para obtener todos las tiendas favoritas del usuario

    Args:
        request (): django

    Returns:
        Response: Retorna Serializado todos los datos encontrados
    '''
    
    user=get_user(request.user)
    sellers=FavoriteCompanies.objects.filter(user=user)
    serializers=FavSeller(sellers,many=True)
    return Response(serializers.data)

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['POST'])
def add_fav_seller(request):
    '''metodo para añadir una tienda a la lista de favoritos

    Args:
        request (): django

    Returns:
        json : mensaje de respuesta 
    '''
    user=request.user
    try:
        user=User.objects.get(email=user)
        user_seller=User.objects.get(email=request.data.get('user_seller'))
        FavoriteCompanies.objects.create(user=user,user_seller=user_seller)
        return Response({'message': 'Empresa añadida exitosamente'})
    except:
        return Response({'message': 'Ha ocurrido un error'})

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['DELETE'])
def del_fav_seller(request,seller_id):
    '''metodo para eliminar una tienda de la lista de favoritos

    Args:
        request (): django
        seller_id (int): id de la tienda a eliminar

    Returns:
        json : mensaje de respuesta 
    '''
    seller=FavoriteCompanies.objects.get(user_seller=seller_id)
    seller.delete()
    return Response({'message': 'Producto eliminado exitosamente'})

#WHISHLISTS

#CRUD Wishlist

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['GET'])
def get_all_wishlists(request):
    """metodo para obtener todas las wishlist que tiene un usuario, sin los productos que hay dentro de esta

    Args:
        request (): Django

    Returns:
        Response: Retorna Serializado todos los datos recibidos
    """

    user=get_user(request.user)
    wishlists=WishList.objects.filter(user=user)
    print(wishlists.values())
    serializer=WishListSeri(wishlists,many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['GET'])
def get_wishlist(request,wishlist_id):
    """metodo para obtener una wishlist en especifico 

    Args:
        request (): Django
        wishlist_id (int): id de la wishlist a buscar

    Returns:
        Response: Retorna Serializado todos los datos recibidos
    """
    user=get_user(request.user)
    wishlists=WishList.objects.filter(user=user)
    wishlist=wishlists.filter(_id=wishlist_id)
    serializer=WishListSeri(wishlist,many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['POST'])
def create_wishlist(request):
    '''metodo para crear una wishlist

    Args:
        request (): django

    Returns:
        Response: Mensaje de confirmación
    '''
    user=get_user(request.user)
    form=CreateWishList(request.data)
    if form.is_valid():
        wishlist=form.save(commit=False)
        wishlist.user=user
        wishlist.save()
        return Response({'message':'Se ha creado correctamente'})
    return Response({'error':'no se pudo crear'})
        

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['PUT'])
def update_wishlist(request,wishlist_id):
    '''Metodo para actualizar el nombre de una wishlist en especifico

    Args:
        request (): django
        wishlist_id (int): Id de la wishlist a actualizar

    Returns:
        Response: Mensaje de confirmacion luego de actualizar los datos
    '''
    user=get_user(request.user)
    print('LLEGA HASTA ACA')
    wishlists=WishList.objects.filter(user=user)
    wishlist=wishlists.get(_id=wishlist_id)
    form=CreateWishList(request.data, instance=wishlist)
    if form.is_valid():
        form.save()
        return Response({'message': 'Wishlist actualizada exitosamente'})
    else:
        return Response({'ERROR': 'No se pudo actualizar la wishlist'})

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['DELETE'])
def delete_wishlist(request,wishlist_id):
    '''Metodo para eliminar una wishlist en especifico

    Args:
        request (): django
        wishlist_id (int): Id de la wishlist a eliminar

    Returns:
        Response: Mensaje de confirmacion luego de eliminar
    '''
    user=get_user(request.user)
    wishlists=WishList.objects.filter(user=user)
    wishlist=wishlists.get(_id=wishlist_id)
    wishlist.delete()
    return Response({'message': 'Producto eliminado exitosamente'})


@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['GET'])
def get_wishlist_products(request,wishlist_id):
    '''metodo para obtener todos los productos que tiene una wishlist

    Args:
        request (): django
        wishlist_id (int): id de la wishlist a mirar

    Returns:
        Response: Retorna Serializado todos los datos encontrados
    '''
    user=get_user(request.user)
    wishlists=WishList.objects.filter(user=user)
    wishlist=wishlists.filter(_id=wishlist_id).first()
    #Filtrar los datos para obtener una wishlist
    if wishlist:
        wl_products = wishlist.products.all()
        product_id = [product._id for product in wl_products] #se obtiene los id de cada producto de la wishlist
        products=[]
        for i in product_id: #ciclo para poder obtener la info del producto desde su id
            products=products+list(Product.objects.filter(_id=i)) #se junta en una lista
        serializer=ProductSerializerShow(products,many=True)#se serializa esa lista 
    return Response(serializer.data)

#Addresses

#CRUD Addresses

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['GET'])
def get_addresses(request):
    user=get_user(request.user)
    addresses=Addresses.objects.filter(user=user)
    serializer=AddressSerializer(addresses,many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['POST'])
def add_address(request):
    #user=get_user("ClienteEjemplo1@gmail.com")#ELIMINAR CUANDO YA NO USE POSTMAN
    user=get_user(request.user)
    form=CreateAddressForm(request.data)
    if form.is_valid():
        address=form.save(commit=False)
        address.user=user
        address.save()
        return Response({'message': 'Direccion añadida exitosamente'})
    else:
        return Response({'message': 'Ha ocurrido un error'})

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['PUT'])
def update_address(request,address_id):
    #user=get_user("ClienteEjemplo1@gmail.com")#ELIMINAR CUANDO YA NO USE POSTMAN
    user=get_user(request.user)
    address=Addresses.objects.filter(user=user).get(id=address_id)
    for key in request.data:
        if request.data.get(key):
            setattr(address,key,request.data.get(key))
    return Response({'message': 'Direccion actualizada exitosamente'})

@permission_classes([IsAuthenticated])
@login_required
@user_passes_test(is_client)
@api_view(['DELETE'])
def delete_address(request,address_id):
    #user=get_user("ClienteEjemplo1@gmail.com")#ELIMINAR CUANDO YA NO USE POSTMAN
    user=get_user(request.user)
    address=Addresses.objects.filter(user=user).get(id=address_id).delete()
    return Response({'message': 'Direccion eliminada exitosamente'})

#SUPPORT
