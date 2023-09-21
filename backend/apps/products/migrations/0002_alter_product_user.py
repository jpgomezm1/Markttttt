# Generated by Django 4.2.2 on 2023-09-15 13:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_username'),
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='user',
            field=models.ForeignKey(limit_choices_to={'role': 'SELLER'}, null=True, on_delete=django.db.models.deletion.CASCADE, to='user.seller'),
        ),
    ]