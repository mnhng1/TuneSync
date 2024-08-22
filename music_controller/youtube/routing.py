# chat/routing.py
from django.urls import re_path
from django.views.decorators.csrf import csrf_exempt

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/room/youtube/(?P<roomCode>\w+)/?$", csrf_exempt(consumers.YoutubeConsumer.as_asgi())),
]

