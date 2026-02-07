#!/bin/bash
set -e

cd web_backend

python manage.py makemigrations --noinput

python manage.py migrate --noinput

python manage.py collectstatic --noinput

PORT="${PORT:-8000}"
waitress-serve --listen=0.0.0.0:${PORT} web_backend.wsgi:application
