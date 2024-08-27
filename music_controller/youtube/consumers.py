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
    async def disconnect(self, close_code):
        
        logger.info(f"Disconnected with code: {close_code}")
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