
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
import youtube.routing  # Update this with your app's routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'music_controller.settings')
jango_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(youtube.routing.websocket_urlpatterns)))
})




