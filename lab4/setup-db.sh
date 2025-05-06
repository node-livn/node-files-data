#!/bin/bash

# Створюємо користувача та базу даних
PGPASSWORD=9483 psql -U postgres -c "CREATE USER node_user WITH PASSWORD 'node_password';"
PGPASSWORD=9483 psql -U postgres -c "CREATE DATABASE node_db OWNER node_user;"
PGPASSWORD=9483 psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE node_db TO node_user;"

echo "База даних та користувач створені успішно!" 