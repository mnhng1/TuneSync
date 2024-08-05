# routing.py
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/youtube/<str:room_code>/', consumers.YouTubeConsumer.as_asgi()),
]
