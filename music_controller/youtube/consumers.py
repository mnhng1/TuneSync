import json
from channels.generic.websocket import AsyncWebsocketConsumer
import logging
import traceback

logger = logging.getLogger(__name__)


class YoutubeConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        logger.info(f"Connection attempt from {self.scope['client']}")
        try:
            self.room_code = self.scope['url_route']['kwargs']['roomCode']
            logger.info(f"Attempting to join room: {self.room_code}")
            await self.channel_layer.group_add(self.room_code, self.channel_name)
            await self.accept()
            logger.info(f"Connection accepted for room: {self.room_code}")
        except Exception as e:
            logger.error(f"Connection failed: {str(e)}")
            await self.close(code=4000)
        
        # Add guest to the room
        session_key = self.scope['session'].session_key
        room = Room.objects.get(code=self.room_code)
        guest, created = Guest.objects.get_or_create(session_key=session_key)
        room.guests.add(guest)
        room.save()

        # Broadcast the updated guest list
        await self.broadcast_guest_list(room)

    async def disconnect(self, close_code):
        # Remove guest from the room
        session_key = self.scope['session'].session_key
        room = Room.objects.get(code=self.room_code)
        guest = Guest.objects.get(session_key=session_key)
        room.guests.remove(guest)
        room.save()

        # Broadcast the updated guest list
        await self.broadcast_guest_list(room)
        

        await self.channel_layer.group_discard(self.room_code, self.channel_name)

    async def receive(self, text_data):
        def is_json(myjson):
            try:
                json_object = json.loads(myjson)
            except ValueError as e:
                return False
            return True

        if text_data and is_json(text_data):
            data = json.loads(text_data)

            #handle control playback
            if 'action' in data: 
                print(data['action'])
                await self.channel_layer.group_send(
                    self.room_code,
                    {
                        'type': 'control_video',
                        'action': data['action']
                    }
                )
            else: 
                await self.channel_layer.group_send(
                    self.room_code,
                    {
                        'type': 'video_data',
                        'title':data.get('title', ''), 
                        'thumbnailUrl': data.get('thumbnailUrl', ''), 
                        'currentTime': data.get('currentTime', 0), 
                        'duration': data.get('duration', 0), 
                        
                        'state': data.get('state', 'pause')
                    } 
                )
                
    async def broadcast_guest_list(self, room):
        guests = [guest.name for guest in room.guests.all()]
        await self.channel_layer.group_send(
            self.room_code,
            {
                'type': 'guest_list_update',
                'guests': guests
            }
        )

    async def guest_list_update(self, event):
        guests = event['guests']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'guests': guests
        }))


    async def video_data(self, event):
        # Send the video data back to the WebSocket client
        await self.send(text_data=json.dumps({
            'title': event['title'],
            'thumbnailUrl': event['thumbnailUrl'],
            'currentTime': event['currentTime'],
            'duration': event['duration'],
            
            'state': event['state']
        }))   
    
    async def websocket_disconnect(self, event):
        print("closing websocket")
        await self.close()


    async def control_video(self, event):
        if 'action' in event:
            action = event['action']
        await self.send(text_data = json.dumps({'action': action}))