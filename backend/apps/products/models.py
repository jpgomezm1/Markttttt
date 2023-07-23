from django.db import models
from apps.user.models import User
from django.core.exceptions import ValidationError

# Create your models here.
class Product(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True,
        limit_choices_to={'role': User.Role.SELLER})
    SI_NO_CHOICES=[
        ('Si','Si'),
        ('No','No'),
    ]
    name = models.CharField(max_length=200, null=False, blank=True)
    sizes=models.CharField(max_length=3,null=True,choices=SI_NO_CHOICES,default='No')
    image = models.ImageField(null=True, blank=True,
                            default='/placeholder.png')
    description = models.TextField(null=False, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=False, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # countInStock=ForeignKey(Inventory, on_delete=models.CASCADE, null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)
    


class Inventory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False,
                            limit_choices_to={'role': User.Role.SELLER})
    product = models.OneToOneField(Product, on_delete=models.CASCADE, null=False)
    stock = models.IntegerField(null=True, blank=True, default=0)
    size_stock=models.JSONField(null=True,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.product)
    
    def clean(self):
        if self.stock < 0:
            raise ValidationError("El stock no puede ser negativo.")


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=200, null=False, blank=True)
    rating = models.IntegerField(null=False, blank=True)
    comment = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

