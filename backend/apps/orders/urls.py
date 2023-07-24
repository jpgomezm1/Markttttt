from django.urls import path 
from . import views



urlpatterns = [
    path('add/',views.add_order_items,name='order_add'),
    path('get/<int:order_id>/',views.get_order,name='get_order'),
    path('paid/<int:order_id>/',views.paid_order,name='paid_order'),
]