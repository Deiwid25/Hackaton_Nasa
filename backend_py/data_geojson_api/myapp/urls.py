from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_geojson, name='get_geojson'),
]
