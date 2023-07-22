from django.db import models
from apps.user.models import User
from django.core.exceptions import ValidationError
from PIL import Image

# Create your models here.
class Product(models.Model):
    class Category(models.TextChoices):
        TOY = "TOY", 'Toy'
        CLOTHES= "CLOTHES", 'Clothes'
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True,
        limit_choices_to={'role': User.Role.SELLER})
    name = models.CharField(max_length=200, null=False, blank=True)
    image = models.ImageField(null=True, blank=True,
                            default='/placeholder.png')
    category = models.CharField(max_length=200, null=False, blank=True,choices=Category.choices)
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
    
    #ELIMINAR ESTO EN CASO TAL QUE NO FUNCIONE
    '''
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Procesar la imagen si se ha cargado una nueva
        if self.image:
            img = Image.open(self.image)

            # Redimensionar la imagen si es necesario
            max_size = (800, 800)
            if img.width > max_size[0] or img.height > max_size[1]:
                img.thumbnail(max_size)
                img.save(self.image)
                '''


class Inventory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False,
                            limit_choices_to={'role': User.Role.SELLER})
    product = models.OneToOneField(Product, on_delete=models.CASCADE, null=False)
    stock = models.IntegerField(null=True, blank=True, default=0)
    clothing_size_stock=models.JSONField(null=True,blank=True)
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

