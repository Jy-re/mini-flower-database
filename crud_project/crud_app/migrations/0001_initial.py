# Generated by Django 4.2.5 on 2023-09-18 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Flowers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('scientificname', models.CharField(max_length=200)),
                ('season', models.CharField(max_length=200)),
                ('habitat', models.CharField(max_length=200)),
                ('description', models.TextField()),
            ],
        ),
    ]
