# Generated by Django 4.2.2 on 2023-07-05 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_store_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='store_name',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
