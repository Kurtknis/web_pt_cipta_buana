from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import AnonymousUser
from environ import Env

env = Env()

class APIKeyOrReadOnlyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        api_key = request.headers.get('X-API-KEY')
        expected_key = env('API_KEY')
        if api_key == expected_key:
            return (AnonymousUser(), None)
        return None
