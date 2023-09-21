from django.contrib.auth.forms import UserCreationForm
from django import forms
from .models import *

#Register
class ClientRegistrationForm(UserCreationForm):
    """clase para crear el formulario de registro de los clientes
    """
    class Meta(UserCreationForm.Meta):
        model = Client
        fields = ('first_name','second_name','last_name','email','password1', 'password2','phone_number')

class SellerRegistrationForm(UserCreationForm):
    """Clase para poder crear el formulario de registro
    de los vendedores
    """
    class Meta(UserCreationForm.Meta):
        model=Seller
        fields=('store_name','category','email','password1','password2','phone_number')

class UpdateClientAccForm(forms.ModelForm):
    first_name=forms.CharField(max_length=20,required=False)
    last_name=forms.CharField(max_length=20,required=False)
    phone_number = forms.CharField(max_length=20, required=False)
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('first_name','last_name','email','phone_number')

class UpdateSellerAccForm(forms.ModelForm):
    first_name=forms.CharField(max_length=20,required=False)
    last_name=forms.CharField(max_length=20,required=False)
    phone_number = forms.CharField(max_length=20, required=False)
    facebook = forms.CharField(max_length=100, required=False)
    instagram= forms.CharField(max_length=100, required=False)
    twitter= forms.CharField(max_length=100, required=False)
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('first_name','last_name','email','phone_number','facebook','instagram','twitter')

        