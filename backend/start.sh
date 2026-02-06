{
  "build": {
    "builder": "PYTHON"
  },
  "deploy": {
    "startCommand": "waitress-serve --listen=0.0.0.0:8000 web_backend.wsgi:application"
  }
}
