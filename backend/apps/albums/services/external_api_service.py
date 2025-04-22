import requests
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

from django.conf import settings

class ExternalAPIService:
    BASE_URL = 'https://ws.audioscrobbler.com/2.0/'
    API_KEY = settings.LAST_FM_API_KEY

    SPOTIFY_BASE_URL = 'https://api.spotify.com/v1/'
    SPOTIFY_CLIENT_ID = settings.SPOTIFY_CLIENT_ID
    SPOTIFY_CLIENT_SECRET = settings.SPOTIFY_CLIENT_SECRET

    @classmethod
    def lastfm_search(cls, query: str):
        param_string = f'?method=album.search&album={query.lower()}&api_key={cls.LAST_FM_API_KEY}&format=json'
        try:
            response = requests.get(cls.LAST_FM_BASE_URL + param_string)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Last.fm API Error: {e}")
            return None

    @classmethod
    def spotify_search(cls, query: str, limit: int = 40):
        client_credentials_manager = SpotifyClientCredentials(
            client_id=cls.SPOTIFY_CLIENT_ID,
            client_secret=cls.SPOTIFY_CLIENT_SECRET
        )
        sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

        try:
            results = sp.search(q=f'album:{query}', type='album', limit=limit)
            return results
        except Exception as e:
            print(f"Spotify API Error: {e}")
            return None

    @classmethod
    def search(cls, query: str, source='lastfm'):
        if source.lower() == 'spotify':
            return cls.spotify_search(query)
        else:
            return cls.lastfm_search(query)