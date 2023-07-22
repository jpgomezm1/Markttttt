from .user.models import *

#metodos de soporte para auth
def is_seller(user):
    '''define si el usuario es vendedor'''
    return user.role=='SELLER' or user.role=='ADMIN'

def is_client(user):
    '''define si el usuario es cliente'''
    return user.Role=='CLIENT'

def get_user(user:str):
    '''Metodo de soporte para poder obtener el User

    Args:
        user (str): correo del usuario a buscar

    Returns:
        Response: User que se encuentra
    '''
    #user=request.user
    user=User.objects.get(email=user)
    print(user)
    return user