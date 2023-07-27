#!/bin/bash

# Wait for the database to be ready before running migrations
echo "Waiting for the database to be ready..."
while ! nc -z db 5432; do
    sleep 1
done
echo "Database is ready!"

# Apply Django migrations
python manage.py migrate


# Run Django development server
python manage.py runserver 0.0.0.0:8000