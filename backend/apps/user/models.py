from django import forms
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.exceptions import ValidationError

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", 'Admin'
        CLIENT = "CLIENT", 'Cliente'
        SELLER = "SELLER", 'Vendedor'

    base_role = Role.ADMIN
    username = models.CharField(max_length=30, unique=True, blank=True,null=True)
    logo=models.ImageField(verbose_name='store_logo',null=True,blank=True)
    email = models.EmailField(unique=True)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['username']
    role = models.CharField(
        max_length=50, choices=Role.choices, default=Role.CLIENT)
    phone_number=models.CharField(max_length=20,null=True, blank=True)
    social_media=models.JSONField(null=True,blank=True)
    store_name=models.CharField(max_length=30,null=True, blank=True)

    def __str__(self):
        return self.email


class Client(User):
    '''Model para el usuario Cliente

    Args:
        User : Modelo que se hizo para el User
    '''
    base_role = User.Role.CLIENT

    class Meta:
        proxy = True

class Seller(User):
    base_role = User.Role.SELLER
    
    def clean(self):
        super().clean()
        if self.role == self.Role.SELLER and not self.store_name:
            raise ValidationError({'store_name': 'El nombre de la tienda es obligatorio para los vendedores.'})

    class Meta:
        proxy = True
        
    def __str__(self):
        return str(self.store_name)
    #founders_info = models.JSONField(null=True)




