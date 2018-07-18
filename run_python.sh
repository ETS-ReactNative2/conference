#!/usr/bin/env bash

echo ===== INSTALLING SYSTEM DEPENDENCIES =====
apt-get update -qq \
&& apt-get upgrade -y -qq \
&& apt-get install -y -qq gdal-bin python-gdal

echo ===== INSTALLING PYTHON DEPENDENCIES =====
cd conference
pip install -r ./requirements.txt -q -v
cd conference
echo ===== RUN DATABASE MIGRATION =====
python manage.py makemigrations
python manage.py migrate
echo ===== RUN PYTHON SERVER =====
python manage.py runserver 0.0.0.0:8001
