from django.db import models

# Create your models here.
class MailSubscribers(models.Model):
    email=models.EmailField(max_length=200, null=False,unique=True)
    
    def __str__(self):
        return str(self.email)