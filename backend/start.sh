#!/bin/bash
set -e

cd web_backend

# Generate migrations (not recommended for production, but possible)
python manage.py makemigrations --noinput

# Apply migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Start Waitress (Railway sets PORT; default 8000 for local)
PORT="${PORT:-8000}"
waitress-serve --listen=0.0.0.0:${PORT} web_backend.wsgi:application
