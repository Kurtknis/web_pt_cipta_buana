#!/bin/bash
set -e

# Build frontend
cd frontend
npm install
npm run build
cp -r build/* ../backend/staticfiles/

# Backend
cd ../backend
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

# Start server
waitress-serve --listen=0.0.0.0:8000 web_backend.wsgi:application
