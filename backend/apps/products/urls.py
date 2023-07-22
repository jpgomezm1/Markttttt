from django.urls import path 
from . import views, inventory



urlpatterns = [
    #ALL
        #path('nombre de la empresa/get_product/<str:pk>',views.get_product,name='get_product'),
    path('<int:store_id>/products/',views.get_store_products,name='get_store_products'),#obtener los productos de id empresa
    path('<int:store_id>/product/<int:product_id>/',views.detail_product,name='get_product'),#obtener un producto en especifico
    path('get_products/',views.get_all_products ,name='get_products'), #obtener todos los productos creados
    
    #Client
    path('client/AddToWishL/<int:wishlist_id>/product/<int:product_id>/',views.add_product_to_wishlist,name='add_pro_to_wl'),
    path('client/RmFromWishL/<int:wishlist_id>/product/<int:product_id>/',views.rm_product_from_wishlist,name='rm_pro_from_wl'),
    #Seller
    
        #INICIO CRUD Product
    path('seller/AddProduct/',views.create_product,name='create_product'),
    path('seller/DeleteProduct/<int:product_id>/',views.delete_product,name='delete_product'),
    path('seller/UpdateProduct/<int:product_id>/',views.update_product,name='update_product'),
    
        #FIN CRUD Producto
    
    #Inventario
    path('inventory/',inventory.get_inventory,name='inventory'),
    path('inventory/UpdateInventory/<int:product_id>/',inventory.update_inventory_product,name='update_inventory')
]