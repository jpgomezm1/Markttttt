# Generated by Django 4.2.2 on 2023-07-16 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
        ('lists', '0003_alter_wishlist_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderhistory',
            name='orders',
            field=models.ManyToManyField(to='orders.order'),
        ),
    ]
