from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import string 
import random
# Create your views here.


'''
class RoomView(generics.CreateAPIView): This defines a view for creating Room instances. It inherits from generics.CreateAPIView, which is a generic class-based view for creating instances of a model.

queryset = Room.objects.all(): This specifies the queryset that should be used for this view. In this case, it's all instances of the Room model. However, for a CreateAPIView, this queryset is not used directly.

serializer_class = RoomSerializer: This specifies the serializer class that should be used for validating and deserializing input, and for serializing output. In this case, it's the RoomSerializer you've defined. 
'''

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all() 
    serializer_class = RoomSerializer

class JoinRoom(APIView):
    lookup_url_kwarg = 'code'
    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        code = request.data.get(self.lookup_url_kwarg)
        if code!= None:
            room = Room.objects.filter(code=code).first()
            if room is not None:
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status = status.HTTP_200_OK)
            return Response({"Bad Request": "Invalid Room Code"}, status = status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request": "Invalid post data, did not find a code key"}, status = status.HTTP_400_BAD_REQUEST)

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code is not None:
            room = Room.objects.filter(code=code).first()
            if room is not None:
                data = RoomSerializer(room).data
                data['is_host'] = self.request.session.session_key == room.host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)


def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Generate room code and save to session
            room_code = generate_unique_code()
            self.request.session['room_code'] = room_code
            self.request.session.save()

            # Extract data from serializer
            guest_can_pause = serializer.validated_data.get('guest_can_pause')
            votes_to_skip = serializer.validated_data.get('votes_to_skip')
            host = self.request.session.session_key
            
            # Query and update or create room
            room, created = Room.objects.update_or_create(
                host=host,
                defaults={
                    'guest_can_pause': guest_can_pause,
                    'votes_to_skip': votes_to_skip,
                    'code': room_code  # Ensure the room code is set here
                }
            )
            
            # Return serialized room data
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserInRoom(APIView):

    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        room_code = self.request.session.get('room_code')
        session_key = self.request.session.session_key
        print(f"Session Key: {session_key}")
        print(f"Room Code: {room_code}")
        if room_code:
            room = Room.objects.filter(code=room_code).first()
            if room:
                data = {
                    'code': room_code
                }
                return JsonResponse(data, status=status.HTTP_200_OK)

        # If no valid room code found or room doesn't exist, clear session
        
        self.request.session['room_code'] = None
        return JsonResponse({'error': 'Room not found.' }, status=status.HTTP_404_NOT_FOUND)


class LeaveRoom(APIView):
    
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room = Room.objects.filter(host = host_id).first()
            room.delete()
            

        return Response({'message':'success'}, status= status.HTTP_200_OK)