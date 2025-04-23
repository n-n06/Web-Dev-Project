from django.urls import path

from apps.albums.views import (
    AlbumSearchAPIView, album_detail_view, album_list_view
)

urlpatterns = [
    path("search/", AlbumSearchAPIView.as_view(), name="album-search"),
    path("<str:spotify_id>/", album_detail_view, name="album-detail"),
    path("", album_list_view, name="album-list")
]