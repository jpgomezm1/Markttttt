from django.contrib import admin
from .models import *

admin.site.register(Client)
admin.site.register(Seller)

#Definir los nombres que aparecen en el admin
Client._meta.verbose_name_plural='Clients'
Seller._meta.verbose_name_plural='Sellers'