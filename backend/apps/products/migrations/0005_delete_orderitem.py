# Generated by Django 4.2.2 on 2023-07-16 20:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_alter_inventory_product'),
    ]

    operations = [
        migrations.DeleteModel(
            name='OrderItem',
        ),
    ]
