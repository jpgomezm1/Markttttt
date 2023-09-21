from django import forms
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.exceptions import ValidationError

class User(AbstractUser):
    """Clase User la cual es la base para que Client y Seller hereden
    sus atributos

    Args:
        AbstractUser (): Clase base User de Django

    Returns:
        str: devuelve el email del usuario
    """
    class Role(models.TextChoices):
        ADMIN = "ADMIN", 'Admin'
        CLIENT = "CLIENT", 'Cliente'
        SELLER = "SELLER", 'Vendedor'    
    first_name=None
    last_name=None
    #username=None
    base_role = Role.ADMIN
    email = models.EmailField(unique=True)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['username']
    role = models.CharField(
        max_length=50, choices=Role.choices, default=Role.ADMIN)
    phone_number=models.CharField(max_length=20,null=True, blank=True)

    
    def __str__(self):
        return self.email


class Client(User):
    '''Model para el usuario Cliente

    Args:
        User : clase user creada
    '''
    base_role = User.Role.CLIENT
    first_name=models.CharField(max_length=20)
    second_name=models.CharField(max_length=20,blank=True)
    last_name=models.CharField(max_length=20)

class Seller(User):
    """Model para el usuario vendedor

    Args:
        User (): Clase User creada de base

    Raises:
        ValidationError: error en caso tal de que no se ingrese un nombre
        tienda

    Returns:
        str: nombre de la tienda 
    """
    class Category(models.TextChoices):
        CLOTHES = "CLOTHES", 'Ropa'
        ACCESSORIES= "ACCESSORIES", 'Accesorios'
        HOME = "HOME", 'Hogar'
        PETS= "PETS", 'Mascotas'
    store_name=models.CharField(max_length=30,null=True, blank=True)
    category=models.CharField(max_length=20,null=True, blank=True,choices=Category.choices)
    logo=models.ImageField(verbose_name='store_logo',null=True,blank=True)
    social_media=models.JSONField(null=True,blank=True)
    base_role = User.Role.SELLER
    def clean(self):
        super().clean()
        if self.role == self.Role.SELLER and not self.store_name:
            raise ValidationError({'store_name': 'El nombre de la tienda es obligatorio para los vendedores.'})


    def __str__(self):
        return str(self.store_name)
    #founders_info = models.JSONField(null=True)

'''
class Clothes(Seller):
    class Category(models.TextChoices):
        TOP = "TOP", 'Superior'
        BOTTOM= "BOTTOM", 'Inferior'
        SHOES = "SHOES", 'Zapatos'
    category=models.CharField(max_length=20,null=True, blank=True,choices=Category.choices)

class Pets(Seller):
    class Category(models.TextChoices):
        TOYS = "TOYS", 'Juguetes'
        ACCESSORIES= "ACCESSORIES", 'Accesorios'
    category=models.CharField(max_length=20,null=True, blank=True,choices=Category.choices)

class Accessories(Seller):
    color=models.CharField(max_length=20,null=True, blank=True)

class Home(Seller):
    color=models.CharField(max_length=20,null=True, blank=True)
    '''