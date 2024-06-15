from django.contrib import admin
from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('create-room', index),
    path('join-room', index),
    path('room/<str:roomCode>', index)

]