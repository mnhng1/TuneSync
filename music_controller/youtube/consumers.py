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
            print("Received data is valid JSON", text_data)
        else:
            print("Received data is not valid JSON", text_data)
        
        
    async def websocket_disconnect(self, close_code):
        try:
            # Call the superclass's disconnect method
            await super().websocket_disconnect(close_code)
        except Exception as e:
            # Log the exception
            logger.error(f"WebSocket disconnect error: {e}")
            logger.error(traceback.format_exc())

        

    async def control_video(self, event):
        if 'action' in event:
            action = event['action']
        await self.send(text_data = json.dumps({'action': action}))