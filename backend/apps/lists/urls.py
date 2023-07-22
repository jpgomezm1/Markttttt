from django.urls import path 
from . import views

urlpatterns = [
    #Favorite sellers
    path('FavSellers/',views.get_fav_sellers,name='fav_sellers'),
    path('FavSellers/AddFavSeller/',views.add_fav_seller,name='add_fav_seller'),
    path('FavSellers/DelFavSeller/<int:seller_id>/',views.del_fav_seller,name='del_fav_seller'),

    #Wishlist
    path('WishLists/',views.get_all_wishlists,name='wishlists'),
    path('WishList/<int:wishlist_id>/',views.get_wishlist,name='get_wishlist'),
    path('WishList/Create/',views.create_wishlist,name='create_wishlist'),
    path('WishList/Update/<int:wishlist_id>/',views.update_wishlist,name='update_wishlist'),
    path('WishList/Delete/<int:wishlist_id>/',views.delete_wishlist,name='delete_wishlist'),
    path('WishList/<int:wishlist_id>/Products/',views.get_wishlist_products,name='wishlist_products'),

    #Addreses
    path('Addresses/',views.get_addresses,name='addresses'),
    path('Address/Add/',views.add_address,name='new_addresses'),
    path('Address/Update/<int:address_id>/',views.update_address,name='update_addresses'),
    path('Address/Delete/<int:address_id>/',views.delete_address,name='update_addresses'),
]