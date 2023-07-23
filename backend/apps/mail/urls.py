from django.urls import path 
from . import views

urlpatterns = [
    path('subscribe/<str:email>/',views.subscribe,name='subscribe'),
    path('unsubscribe/<str:email>/',views.unsubscribe,name='unsubscribe'),
]