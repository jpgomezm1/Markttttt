from django.core.exceptions import ObjectDoesNotExist

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND

from .user.models import *

#metodos de soporte para auth
def get_error(e):
    
    if isinstance(e,ObjectDoesNotExist): #or e==User.DoesNotExist:
        return Response({"status": "error", "message": "No existe"}, status=HTTP_404_NOT_FOUND)
    else:
        print(f'{e} ESTE ES EL ERROR')
        return Response({"status": "error", "message": "Hubo un error en el servidor. Por favor, intenta nuevamente más tarde."}, status=HTTP_500_INTERNAL_SERVER_ERROR)

def is_seller(user):
    '''define si el usuario es vendedor'''
    return user.role=='SELLER' or user.role=='ADMIN'

def is_client(user):
    '''define si el usuario es cliente'''
    return user.role=='CLIENT'

def get_user(email:str):
    '''Metodo de soporte para poder obtener el User

    Args:
        user (str): correo del usuario a buscar

    Returns:
        Response: User que se encuentra
    '''
    #user=request.user
    user=User.objects.get(email=email)
    print(user)
    return user

'''def get_user(**kwargs):
    user=User.objects.get(**kwargs)
    return user'''