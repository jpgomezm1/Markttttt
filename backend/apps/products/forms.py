from django import forms
from .models import Product,Inventory

class AddProductForm(forms.ModelForm):
    class Meta:
        model=Product
        fields=['name','category','image','description','price']
        
class InventoryUpdateForm(forms.ModelForm):
    class Meta:
        model=Inventory
        fields=['stock']