#!/bin/bash

DB_HOST="maria-db"
DB_PORT="3306"
DB_NAME="food-consumer"
DB_USER="food-consumer"
DB_PASS="67b7f471fa16819e"

SQL_QUERY="UPDATE perm_task SET user_id = null"

mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "$SQL_QUERY"
