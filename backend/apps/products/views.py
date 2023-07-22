from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .support import *

from apps.user.models import User
from apps.support import *

from apps.products.models import Product,Inventory
from apps.products.forms import *

from django.contrib.auth.decorators import login_required, user_passes_test

from .serializers import ProductsSerializer, InventorySerializer

from apps.lists.models import WishList
from apps.lists.serializers import WishListSeri
#from apps.lists.views import get_all_wishlists

#All
@api_view(['GET'])
def get_store_products(request,store_name):
    '''metodo para obtener todos los productos de una tienda

    Args:
        request (): request de django
        store_name (): nombre de la tienda objetivo

    Returns:
        Response: devuelve los datos serializados de los produtctos encontrados
    '''
    try:
        user=User.objects.get(store_name=store_name)
        products= Product.objects.filter(user=user)
        serializer=ProductsSerializer(products,many=True)
        return Response(serializer.data)
    except:
        return Response({"mensaje":"la tienda que buscas no existe"})

@api_view(['GET'])
def detail_product(request,store_name,product_id):
    '''metodo para ver a detalle toda la info de un producto

    Args:
        request (): django
        store_name (int): id de la tienda
        product_id (int): id del producto

    Returns:
        Response: Retorna Serializado todos los datos recibidos
    '''
    exists,serializer=product_exists(store_name,product_id)
    try:
        if exists:
            return Response(serializer.data)
        else:
            return Response({"mensaje":"no se encontró el producto buscado"})
    except:
        return Response({"mensaje":"no se encontró el producto buscado"})

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

#@login_required #si se quiere probar con postman se debe comentar
#@user_passes_test(is_seller) #si se quiere probar con postman se debe comentar
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
    user=get_user("ClienteEjemplo1@gmail.com")#ELIMINAR CUANDO YA NO USE POSTMAN
    #user=get_user(request.user)
    wishlists=WishList.objects.filter(user=user)
    wishlist=wishlists.filter(_id=wishlist_id).first()
    if wishlist:
        product=Product.objects.get(_id=product_id)
        wishlist.products.add(product)
        print(dir(wishlist.products))
        return Response({'message': 'Producto añadido correctamente a la wishlist'})
    return Response({'message': 'ERROR al añadir el producto ya que la wishlist no existe'})

#@login_required #si se quiere probar con postman se debe comentar
#@user_passes_test(is_seller) #si se quiere probar con postman se debe comentar
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
    user=get_user("ClienteEjemplo1@gmail.com")#ELIMINAR CUANDO YA NO USE POSTMAN
    #user=get_user(request.user)
    wishlists=WishList.objects.filter(user=user)
    wishlist=wishlists.filter(_id=wishlist_id).first()
    if wishlist:
        product=Product.objects.get(_id=product_id)
        wishlist.products.remove(product)
        return Response({'message': 'Producto eliminado correctamente a la wishlist'})
    return Response({'message': 'ERROR al eliminar el producto ya que la wishlist no existe'})


#Seller

######CRUD Product
#@login_required #si se quiere probar con postman se debe comentar
#@user_passes_test(is_seller) #si se quiere probar con postman se debe comentar
@api_view(['GET', 'POST'])
def create_product(request):
    '''Crear producto y lo añade directamente al inventario con stock en 0

    Args:
        request (): django

    Returns:
        Response: Retorna mensaje o error al momento de crear el producto
    '''
    if request.method=='POST':
        form=AddProductForm(request.data)
        user=get_user('VendedorEjemplo1@gmail.com') #ELIMINAR CUANDO YA NO USE POSTMAN
        #user=request.user
        #user=User.objects.get(email=user)
        if form.is_valid():
            product=form.save(commit=False)
            product.user=user #ELIMINAR CUANDO YA NO USE POSTMAN
            product.save()
            Inventory.objects.create( user=user, product=product,stock=0)
            return Response({'message': 'Producto creado exitosamente'})
        else:
            return Response({'ERROR':'No se pudo crear el producto'})
    else:
        form=AddProductForm()

#@login_required #si se quiere probar con postman se debe comentar
#@user_passes_test(is_seller) #si se quiere probar con postman se debe comentar
@api_view(['GET', 'PUT'])
def update_product(request, product_id):
    '''actualizar producto

    Args:
        request (): django
        product_id (int): id del producto

    Returns:
        Response: Retorna mensaje o error al momento de actualizar el producto el producto
    '''
    store_name='Tienda1'#ELIMINAR CUANDO YA NO USE POSTMAN
    #store_name=request.user
    exists,serializer=product_exists(store_name,product_id)
    if exists:
        product = Product.objects.get(_id=product_id)
        if request.method == 'PUT':
            form = AddProductForm(request.data, instance=product)
            if form.is_valid():
                form.save()
                return Response({'message': 'Producto actualizado exitosamente'})
            else:
                return Response({'ERROR': 'No se pudo actualizar el producto'})
        else:
            form=AddProductForm(instance=product)
            return Response({'Mensaje': 'si es get devuelvo el formulario'})
    else:
        return Response({'ERROR': 'Producto no encontrado'})

#@login_required #si se quiere probar con postman se debe comentar
#@user_passes_test(is_seller) #si se quiere probar con postman se debe comentar
@api_view(['DELETE'])
def delete_product(request,product_id):
    '''Eliminar producto

    Args:
        request (): django
        product_id (int): id del producto

    Returns:
        Response: Retorna mensaje o error al momento de eliminar el producto
    '''
    store_name="Tienda1" #ELIMINAR CUANDO YA NO USE POSTMAN
    exists,serializer=product_exists(store_name,product_id)
    if exists:
        product = Product.objects.get(_id=product_id)
        product.delete()
        return Response({'message': 'Producto eliminado exitosamente'})
    else:
        return Response({'ERROR': 'Producto no encontrado'})

#####FIN DEL CRUD

