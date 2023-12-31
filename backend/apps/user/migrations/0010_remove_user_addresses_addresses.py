# Generated by Django 4.2.2 on 2023-07-20 07:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_alter_user_logo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='addresses',
        ),
        migrations.CreateModel(
            name='Addresses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200)),
                ('address', models.CharField(blank=True, max_length=200)),
                ('country', models.CharField(blank=True, max_length=200)),
                ('city', models.CharField(blank=True, max_length=200)),
                ('region', models.CharField(blank=True, max_length=200)),
                ('postal_code', models.CharField(blank=True, max_length=200)),
                ('user', models.ForeignKey(limit_choices_to={'role': 'CLIENT'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
