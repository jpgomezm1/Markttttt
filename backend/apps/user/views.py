from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages

from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from apps.support import *
from .forms import *
from .serializers import *
from apps.mail.models import MailSubscribers
from django.core.exceptions import ObjectDoesNotExist

from django.core.mail import send_mail
from django.conf import settings
#All

#CRUD Account
@api_view(['POST'])
def register_account(request):
    '''Metodo para registrar un usuario nuevo por medio del formulario en forms

    Args:
        request (): django

    Returns:
        Json : Mensaje de confirmacion o error
    '''
    form = RegistrationForm(request.POST)
    if form.is_valid():
        email=request.POST["email"]
        MailSubscribers.objects.create(email=email)
        send_mail(
            'Greacias por crear tu cuenta en Markt',
            'creaste una cuenta',
            settings.EMAIL_HOST_USER,
            [email]
        )
        form.save()
        return Response({'message': 'Cuenta creada exitosamente'})
    else:
        errors = form.errors
        error_message = {}
        for field, error_list in errors.items():
            error_message[field] = error_list[0]
        return Response({'ERROR Message': error_message})

#@login_required #si se quiere probar con postman se debe comentar
@api_view(['GET'])
def get_account_info(request):
    '''Metodo para obtener la informacion de la cuenta

    Args:
        request (): django

    Returns:
        Response: Retorna Serializado todos los datos recibidos
    '''
    
    try:
        user=get_user('VendedorEjemplo3@gmail.com')#Ejemplo Vendedor #ELIMINAR CUANDO YA NO USE POSTMAN
        #user=get_user("ClienteEjemplo4@gmail.com")#Ejemplo cliente #ELIMINAR CUANDO YA NO USE POSTMAN
        #user=get_user(request.user)
        print(user.role)
    except ObjectDoesNotExist:
        return Response({'message': 'La cuenta no existe'})
    if user.role=='SELLER':
        serializer=UserSellerSerializer(user,many=False)
    else:
        serializer=UserClientSerializer(user,many=False)
    return Response(serializer.data)

#@login_required #si se quiere probar con postman se debe comentar
@api_view(['PUT'])
def update_account_info(request):
    '''Metodo para actualizar la cuenta

    Args:
        request (): django

    Returns:
        Json : Mensaje de confirmacion o error
    '''
    try:
        user=get_user("VendedorEjemplo3@gmail.com")#Ejemplo vendedor #ELIMINAR CUANDO YA NO USE POSTMAN
        #user=get_user("clientePostman1@gmail.com")#Ejemplo cliente #ELIMINAR CUANDO YA NO USE POSTMAN
        #user=get_user(request.user)
    except ObjectDoesNotExist:
        return Response({'message': 'La cuenta no existe'})

    if is_seller(user):
        form=UpdateSellerAccForm(request.data,instance=user)
        social_media=get_social_media_data('facebook','instagram','twitter',data=request.data)
    else:
        form=UpdateClientAccForm(request.data,instance=user)
    
    if form.is_valid():
        sm=form.save(commit=False)#socialmedia update
        sm.social_media=social_media
        sm.save()
        return Response({'message': 'Cuenta actualizada exitosamente'})
    else:
        errors = form.errors
        error_message = {}
        for field, error_list in errors.items():
            error_message[field] = error_list[0]
        return Response({'ERROR Message': error_message})    


#@login_required #si se quiere probar con postman se debe comentar
@api_view(['DELETE'])
def delete_account(request):
    '''Metodo para eliminar un usuario

    Args:
        request (): django

    Returns:
        Json : Mensaje de confirmacion o error
    '''
    try:
        user=get_user("clientePostman3@gmail.com")#Ejemplo cliente #ELIMINAR CUANDO YA NO USE POSTMAN
        #user=get_user(request.user)
        user.delete()
        return Response({'message': 'Cuenta eliminado exitosamente'})
    except ObjectDoesNotExist:
        return Response({'message': 'La cuenta a eliminar no existe'})

@api_view(['POST'])
def login_user_client(request):
    '''Metodo para hacer el Login

    Args:
        request (): django

    Returns:
        Json : Mensaje de confirmacion o error
    '''
    email=request.email['email']
    password=request.password['password']
    user=authenticate(request,username=email,password=password)
    if user is not None:
        login(request,user)
        return Response({"message":"SI existe la cuenta"+request.data})
    else:
        return Response({"message":"no existe la cuenta"+request.data})


#Client

#Seller

#Support
def get_social_media_data(*args,data):
    '''metodo que toma todos los *args para poder sacar el valor de estos y 
    juntarlos en un diccionario para devolverlo como un solo json

    Args:
        data (request.data): todos los datos que envia el usuario

    Returns:
        dic: retorna el diccionario
    '''
    social_media={}
    for key in args:
        print(f'hay datos en {key}: {data}')
        social_media[key]=data.get(key)
    return social_media
