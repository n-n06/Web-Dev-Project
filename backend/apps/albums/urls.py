from django.urls import path
from apps.albums.views import AlbumSearchAPIView

urlpatterns = [
    path("search/", AlbumSearchAPIView.as_view(), name="album-search"),
]