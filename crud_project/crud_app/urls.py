from django.urls import path
from . import views

urlpatterns = [
    path('', views.flowers, name='flowers'),
    path('addmodal/', views.add_flower, name='add_flower'),
    path('get_flower_data/<int:flower_id>/', views.get_flower_data, name='get_flower_data'),
    path('edit_flower/<int:flower_id>/', views.edit_flower, name='edit_flower'),
    path('flowers/<int:flower_id>/delete/', views.delete_flower, name='delete_flower'),
    path('favicon.ico', views.FaviconView.as_view(), name='favicon'),
]
