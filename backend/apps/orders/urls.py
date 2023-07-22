from django.urls import path 
from . import views



urlpatterns = [
    path('add/',views.add_order_items,name='order_add'),
    
]