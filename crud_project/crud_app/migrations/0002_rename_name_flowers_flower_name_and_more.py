# Generated by Django 4.2.5 on 2023-09-20 02:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crud_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='flowers',
            old_name='name',
            new_name='flower_name',
        ),
        migrations.RenameField(
            model_name='flowers',
            old_name='scientificname',
            new_name='scientific_name',
        ),
    ]