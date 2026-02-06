#!/bin/bash
set -e

cd backend
pip install -r requirements.txt

# Generate migrations (not recommended for production, but possible)
python manage.py makemigrations --noinput

# Apply migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Start Waitress
waitress-serve --listen=0.0.0.0:8000 web_backend.wsgi:application
