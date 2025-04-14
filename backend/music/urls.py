from django.urls import path, include

# from .views import (ArtistListCreateView, ArtistDetailView,
#                    AlbumListCreateView, AlbumDetailView, UserProfileView)

urlpatterns = [
    path('auth/', include('apps.auth.urls')),

    # path('artists/', ArtistListCreateView.as_view(), name='artist-list'),
    # path('artists/<int:pk>/', ArtistDetailView.as_view(), name='artist-detail'),

    path('albums/', include('apps.albums.urls')),
    # path('albums/', AlbumListCreateView.as_view(), name='album-list'),
    # path('albums/<int:pk>/', AlbumDetailView.as_view(), name='album-detail'),
    #
    # path('profile/', UserProfileView.as_view(), name='user-profile'),
]