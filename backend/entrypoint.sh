#!/bin/sh
set -e

echo "Waiting for database..."
until python manage.py showmigrations >/dev/null 2>&1; do
  echo "Database unavailable - sleeping 2s"
  sleep 2
done

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Daphne..."
exec daphne -b 0.0.0.0 -p "${PORT:-8000}" backend.asgi:application


# run daphne -b 0.0.0.0 -p 8000 backend.asgi:application
