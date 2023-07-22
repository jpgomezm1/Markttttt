from django import forms
from .models import *

class AddFavSeller(forms.ModelForm):
    class Meta:
        model=FavoriteCompanies
        fields=['user','user_seller']
        
class CreateWishList(forms.ModelForm):
    class Meta:
        model=WishList
        fields=['name']

class CreateAddressForm(forms.ModelForm):
    class Meta:
        model=Addresses
        fields=['name','address','country','city','region','postal_code']