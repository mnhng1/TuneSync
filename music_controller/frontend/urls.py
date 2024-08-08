from django.contrib import admin
from django.urls import path, include
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name =''),
    path('create-room', index),
    path('join-room', index),
    path('room/spotify/<str:roomCode>', index),
    path('ws/room/youtube/<str:roomCode>', index),
    path('login', index)


]