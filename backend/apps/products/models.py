from django.db import models
from apps.user.models import User,Seller
from django.core.exceptions import ValidationError

# Create your models here.
class Product(models.Model):
    user = models.ForeignKey(
        Seller, on_delete=models.CASCADE, null=True,
        limit_choices_to={'role': User.Role.SELLER})
    name = models.CharField(max_length=200, null=False, blank=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=False, blank=True)
    single_size=models.BooleanField(default=True)
    image = models.ImageField(null=True, blank=True)
    description = models.TextField(null=False, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def size_types(self):
        if self.single_size==True:
            return {"Sizes":"Unico"}
        else:
            return {"Sizes":[
                "XS",
                "S",
                "M",
                "L",
                "XL"
                ]}
         
    def __str__(self):
        return str(self.name)


class Inventory(models.Model):
    def size_type(product):
        """Metodo para definir el valor predeterminado
        del stock de un producto

        Returns:
            JSON: stock predeterminado independiente del 
            tipo de tamaño del producto
        """
        if product.single_size==True:
            return {"Unico Tamaño":0}
        else:
            return {
                "XS":0,
                    "S":0,
                    "M":0,
                    "L":0,
                    "XL":0
                    }
    
    user = models.ForeignKey(Seller, on_delete=models.CASCADE, null=False,
                            limit_choices_to={'role': User.Role.SELLER})
    product = models.OneToOneField(Product, on_delete=models.CASCADE, null=False)
    stock=models.JSONField("stock",null=True)

    
        
    def __str__(self):
        return str(self.product)
    
    def clean(self):
        if self.stock < 0:
            raise ValidationError("El stock no puede ser negativo.")


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True,limit_choices_to={'role': User.Role.CLIENT})
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    title = models.CharField(max_length=200)
    rating = models.IntegerField()
    comment = models.TextField()

    def __str__(self):
        return str(self.rating)

