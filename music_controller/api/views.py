from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.


'''
class RoomView(generics.CreateAPIView): This defines a view for creating Room instances. It inherits from generics.CreateAPIView, which is a generic class-based view for creating instances of a model.

queryset = Room.objects.all(): This specifies the queryset that should be used for this view. In this case, it's all instances of the Room model. However, for a CreateAPIView, this queryset is not used directly.

serializer_class = RoomSerializer: This specifies the serializer class that should be used for validating and deserializing input, and for serializing output. In this case, it's the RoomSerializer you've defined. 
'''

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all() 
    serializer_class = RoomSerializer