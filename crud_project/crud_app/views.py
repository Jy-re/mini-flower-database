from django.shortcuts import render
from django.http import JsonResponse
from .models import Flowers

def flowers(request):
    # Assuming you have a Flowers model with a queryset
    flowers = Flowers.objects.all()
    return render(request, 'flower-home.html', {'flowers':flowers})

def add_flower(request):
    if request.method == "POST":
        # Process the form data here
        flower_name = request.POST.get("flower_name")
        scientific_name = request.POST.get("scientific_name")
        season = request.POST.get("season")
        habitat = request.POST.get("habitat")
        description = request.POST.get("description")
        
        flower = Flowers.objects.create(flower_name=flower_name, scientific_name=scientific_name, season=season, habitat=habitat, description=description)
        flower.save()  # Save the new flower instance to the database
        flowers = Flowers.objects.all()

        print(flowers)

        return render(request, 'flower-home.html', {'flowers': flowers})
    return render(request, 'flower-home.html')  
