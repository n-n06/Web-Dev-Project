from django.urls import path

from apps.albums.views import AlbumSearchAPIView, album_detail_view

urlpatterns = [
    path("search/", AlbumSearchAPIView.as_view(), name="album-search"),
    path('albums/<str:spotify_id>/', album_detail_view, name='album-detail')
]