from django import forms
from .models import Product,Inventory

class AddProductForm(forms.ModelForm):
    class Meta:
        model=Product
        fields=['name','image','description','price','single_size']
        
class InventoryUpdateStockForm(forms.ModelForm):
    class Meta:
        model=Inventory
        fields=['stock']

class InventoryUpdateSizeStockForm(forms.ModelForm):
    class Meta:
        model=Inventory
        fields=['stock']