from django.contrib.auth.forms import UserCreationForm
from django import forms
from .models import User


class RegistrationForm(UserCreationForm):
    # Agrega campos personalizados y personaliza los campos si es necesario
    phone_number = forms.CharField(max_length=20, required=False)
    first_name=forms.CharField(max_length=20,required=True)
    last_name=forms.CharField(max_length=20,required=True)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['username']
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('first_name','last_name','email','password1', 'password2','phone_number')

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

        