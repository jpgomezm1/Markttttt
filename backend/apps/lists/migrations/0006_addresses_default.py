# Generated by Django 4.2.2 on 2023-07-24 02:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0005_addresses'),
    ]

    operations = [
        migrations.AddField(
            model_name='addresses',
            name='default',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]