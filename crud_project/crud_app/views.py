from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import Flowers
from .forms import AddFlowerForm
import logging
from django.http import HttpResponse
from django.views.generic import View

class FaviconView(View):
    def get(self, request, *args, **kwargs):
        return HttpResponse(status=204)

logger = logging.getLogger(__name__)

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




def edit_flower(request, flower_id):
    flower = get_object_or_404(Flowers, pk=flower_id)

    if request.method == "POST":
        form = AddFlowerForm(request.POST, instance=flower)
        if form.is_valid():
            form.save()
            return redirect('flowers')  # Redirect to the list of flowers on successful edit
        else:
            # Handle form errors if validation fails
            pass
    else:
        # If it's a GET request, display the form for editing
        form = AddFlowerForm(instance=flower)

    return render(request, 'edit-flower.html', {'form': form, 'flower': flower})



def get_flower_data(request, flower_id):
    flower = get_object_or_404(Flowers, pk=flower_id)
    data = {
        "flower_name": flower.flower_name,
        "scientific_name": flower.scientific_name,
        "season": flower.season,
        "habitat": flower.habitat,
        "description": flower.description,
    }
    return JsonResponse(data)

def delete_flower(request, flower_id):
    try:
        flower = Flowers.objects.get(pk=flower_id)
        flower.delete()
        print("Flower deleted successfully")
        logger.info("Flower deleted successfully")
        # Redirect back to the home page
        return redirect('flowers')
    except Flowers.DoesNotExist:
        logger.warning("Flower not found")
        return HttpResponse("Flower not found", status=404)
    except Exception as e:
        logger.error("Error: %s", e)
        return HttpResponse("Error", status=500)


    
