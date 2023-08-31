from django.db import models
from apps.user.models import User
from django.core.exceptions import ValidationError

# Create your models here.
class Product(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True,
        limit_choices_to={'role': User.Role.SELLER})
    name = models.CharField(max_length=200, null=False, blank=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=False, blank=True)
    image = models.ImageField(null=True, blank=True,
                            default='/placeholder.png')
    description = models.TextField(null=False, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        abstract = True
         
    def __str__(self):
        return str(self.name)
    
class clothes(Product):
    YES_NO_CHOICES=[
        ('Si','Si'),
        ('No','No'),
    ]
    sizes=models.CharField(max_length=3,null=True,choices=YES_NO_CHOICES,default='No')

class accessories(Product):
    YES_NO_CHOICES=[
        ('Si','Si'),
        ('No','No'),
    ]
    sizes=models.CharField(max_length=3,null=True,choices=YES_NO_CHOICES,default='No')

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

