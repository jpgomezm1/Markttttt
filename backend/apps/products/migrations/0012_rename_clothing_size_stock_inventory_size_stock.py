# Generated by Django 4.2.2 on 2023-07-23 06:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0011_alter_product_sizes'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inventory',
            old_name='clothing_size_stock',
            new_name='size_stock',
        ),
    ]
