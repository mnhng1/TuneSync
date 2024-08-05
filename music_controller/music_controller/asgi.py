
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import youtube.routing  # Update this with your app's routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'music_controller.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            youtube.routing.websocket_urlpatterns  # Update this with your app's routing
        )
    ),
})

