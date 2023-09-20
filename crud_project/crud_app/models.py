from django.db import models

# Models:

class Flowers(models.Model):
    flower_name = models.CharField(max_length=200)
    scientific_name = models.CharField(max_length=200)
    season = models.CharField(max_length=200)
    habitat = models.CharField(max_length=200)
    description = models.TextField()