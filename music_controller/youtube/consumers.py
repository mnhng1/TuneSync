import json
from channels.generic.websocket import AsyncWebsocketConsumer


class YoutubeConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_code = self.scope['url_route']["kwargs"]["roomCode"]

        await self.channel_layer.group_add(self.room_code, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_code, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)

        if 'action' in data:
            await self.channel_layer.group_send(
                self.room_code,
                {
                    'type': 'control_video',
                    'action': data['action'],
                }
            )

        if 'message' in data:
            message = data["message"]
            await self.send(text_data=json.dumps({"message": message}))

    async def control_video(self, event):
        if 'action' in event:
            action = event['action']
        await self.send(text_data = json.dumps({'action': action}))