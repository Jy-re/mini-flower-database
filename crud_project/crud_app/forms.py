from django import forms
from .models import Flowers

class AddFlowerForm(forms.ModelForm):
    class Meta:
        model= Flowers
        fields = ['flower_name', 'scientific_name', 'season', 'habitat', 'description' ]