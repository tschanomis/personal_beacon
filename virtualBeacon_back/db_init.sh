#!/bin/sh

php artisan migrate:fresh
php artisan passport:install
php artisan db:seed --class=AdminSeeder