from django.contrib import admin
from .views import AuthURL, spotify_callback
from django.urls import path, include


urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback.as_view())

]