from django.urls import path
from . import views

urlpatterns = [
    path('', views.flowers, name='flowers'),
    path('addmodal/', views.add_flower, name='add_flower'),

]
