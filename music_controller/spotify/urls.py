from django.contrib import admin
from .views import *
from django.urls import path, include


urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('play-song', PlaySong.as_view()),
    path('pause-song', PauseSong.as_view()),
    path('skip-song', SkipSong.as_view()),
    path('prev-song', PrevSong.as_view())
]