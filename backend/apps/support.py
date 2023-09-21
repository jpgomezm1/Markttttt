from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from django.shortcuts import redirect
from functools import wraps
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND

from .user.models import *

#metodos de soporte para auth
def get_error(e):
    if isinstance(e,ObjectDoesNotExist): #or e==User.DoesNotExist:
        return Response({"status": "error", "message": f"No existe ESTE ES EL ERROR{e}"}, status=HTTP_404_NOT_FOUND)
    elif isinstance(e,IntegrityError):
        return Response({"message":e,"status":"error"},status=HTTP_400_BAD_REQUEST)
    else:
        print(f'{e} ESTE ES EL ERROR')
        return Response({"status": "error", "message": f"Hubo un error en el servidor. Por favor, intenta nuevamente más tarde. ESTE ES EL ERROR {e}"}, status=HTTP_500_INTERNAL_SERVER_ERROR)

def is_seller(user)->bool:
    '''define si el usuario es vendedor'''
    return user.role=='SELLER' or user.role=='ADMIN'

def is_client(user)->bool:
    '''define si el usuario es cliente'''
    return user.role=='CLIENT'

def seller_required(test):
    """Decorator para poder saber si el usuario que ingresó es 
    un vendedor

    Args:
        test (bool): 
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if not test(request.user):
                #En caso tal de que no sea vendedor debe de llevarlo a x pagina
                #return redirect('www.google.com')  # Redirigir a la misma página
                return print('NO PODES PASSARRRRRRR')
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator

def client_required(test):
    """Decorator para poder saber si el usuario que ingresó es 
    un cliente

    Args:
        test (bool): 
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if not test(request.user):
                #En caso tal de que no sea vendedor debe de llevarlo a x pagina
                #return redirect('www.google.com')  # Redirigir a la misma página
                return print('NO PODES PASSARRRRRRR')
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator

def get_user(email:str):
    '''Metodo de soporte para poder obtener el User

    Args:
        user (str): correo del usuario a buscar

    Returns:
        Response: User que se encuentra
    '''
    #user=request.user
    try:
        user=User.objects.get(email=email)
        if user.role=='SELLER':
            print('ES SELLER')
            user=Seller.objects.get(email=email)
        elif user.role=='CLIENT':
            print('ES CLIENTE')
            user=Client.objects.get(email=email)
        return user
    except Exception as e:
        return get_error(e)
'''def get_user(**kwargs):
    user=User.objects.get(**kwargs)
    return user'''