from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
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

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host = host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields  = ['guest_can_pause', 'votes_to_skip'])
            else:
                room = Room(host = host, guest_can_pause = guest_can_pause, votes_to_skip = votes_to_skip)
                room.save()
            return Response(RoomSerializer(room).data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)