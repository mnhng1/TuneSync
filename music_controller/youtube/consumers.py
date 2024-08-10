import json
from channels.generic.websocket import AsyncWebsocketConsumer


class YoutubeConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_code = self.scope['url_route']["kwargs"]["room_code"]

        await self.channel_layer.group_add(self.room_code)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_code)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        await self.send(text_data=json.dumps({"message": message}))