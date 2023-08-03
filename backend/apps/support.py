from .user.models import *

from rest_framework.decorators import permission_classes

from rest_framework.permissions import IsAuthenticated
#metodos de soporte para auth

def is_seller(user):
    '''define si el usuario es vendedor'''
    return user.role=='SELLER' or user.role=='ADMIN'

def is_client(user):
    '''define si el usuario es cliente'''
    return user.Role=='CLIENT'

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