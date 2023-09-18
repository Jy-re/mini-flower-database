from django.db import models

# Models:

class Flowers(models.Model):
    name = models.CharField(max_length=200)
    scientificname = models.CharField(max_length=200)
    season = models.CharField(max_length=200)
    habitat = models.CharField(max_length=200)
    description = models.TextField()