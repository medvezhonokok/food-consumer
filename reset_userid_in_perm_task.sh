#!/bin/bash

CONTAINER_NAME="maria-db"
DB_NAME="food-consumer"
DB_USER="food-consumer"
DB_PASS="67b7f471fa16819e"

SQL_QUERY="UPDATE perm_task SET user_id = null"

docker exec "$CONTAINER_NAME" mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "$SQL_QUERY"
