import requests

from django.conf import settings

class ExternalAPIService:
    BASE_URL = 'https://ws.audioscrobbler.com/2.0/'
    API_KEY = settings.LAST_FM_API_KEY

    @classmethod
    def search(cls, query: str):
        param_string = f'?method=album.search&album={query.lower()}&api_key={cls.API_KEY}&format=json'

        try:
            response = requests.get(cls.BASE_URL + param_string)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(e)
            return None