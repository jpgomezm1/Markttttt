from django.urls import path , include
from . import views


urlpatterns = [
    path('<int:id>/products/',include('apps.products.urls')),
    
]


