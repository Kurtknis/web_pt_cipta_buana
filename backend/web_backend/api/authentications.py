from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from environ import Env

env = Env()

class APIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        api_key = request.headers.get('X-API-KEY')
        expected_key = env('API_KEY')
        if api_key != expected_key:
            raise AuthenticationFailed('Invalid API Key')
        return (None, None)
