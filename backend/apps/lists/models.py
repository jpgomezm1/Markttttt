from django.db import models
from apps.user.models import User
from apps.orders.models import Order
from apps.products.models import Product

# Create your models here.
class WishList(models.Model):
    '''modelo de la wishlist, tiene usuario dueño, el nombre de la wishlist, los productos de la wishlist y el id
    '''
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False,
                            limit_choices_to={'role': User.Role.CLIENT})
    name = models.CharField(max_length=200, null=False)
    #products = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    products = models.ManyToManyField(Product,blank=True) #POSIBLE MEJOR SOLUCION
    _id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return str(self.name)

class FavoriteCompanies(models.Model):
    #user = models.OneToOneField(User, on_delete=models.CASCADE, null=False,
    #                        limit_choices_to={'role': User.Role.CLIENT},related_name='user',unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False,
                            limit_choices_to={'role': User.Role.CLIENT},related_name='user')
    user_seller=models.ForeignKey(User, on_delete=models.CASCADE, null=False,
                                limit_choices_to={'role': User.Role.SELLER},related_name='fav_seller', blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f'{str(self.user)} likes {str(self.user_seller)}'


class OrderHistory(models.Model):
    user = models.OneToOneField(
        User, null=True, blank=True, on_delete=models.SET_NULL)
    # user_seller = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL)
    orders = models.ManyToManyField(Order)
    order_status = models.CharField(max_length=10, null=False, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)

class Addresses(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False,
                            limit_choices_to={'role': User.Role.CLIENT})
    name= models.CharField(max_length=200, null=False, blank=True)
    address=models.CharField(max_length=200, null=False, blank=True)
    country=models.CharField(max_length=200, null=False, blank=True)
    city=models.CharField(max_length=200, null=False, blank=True)
    region=models.CharField(max_length=200, null=False, blank=True)
    postal_code=models.CharField(max_length=200, null=False, blank=True)

    def __str__(self):
        return str(self.name)
