from django.urls import path 
from . import views



urlpatterns = [
    path('register/',views.register_account,name='register'),
    
    path('login_user/',views.login_user_client,name='login_client'),
    path('login_seller/',views.login_user_seller,name='login_seller'),
    
    path('info/',views.get_account_info,name='info'),
    path('delete/',views.delete_account,name='delete'),
    path('update/',views.update_account_info,name='update'),
]


