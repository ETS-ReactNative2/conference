#!/usr/bin/env bash

echo ===== INSTALLING SYSTEM DEPENDENCIES =====
apt-get update -qq \
&& apt-get upgrade -y -qq \
&& apt-get install -y -qq gdal-bin python-gdal gcc

pip install --upgrade pip

echo ===== INSTALLING PYTHON DEPENDENCIES =====
cd conference
pip install -r ./requirements.txt -q -v
cd conference
echo ===== RUN DATABASE MIGRATION =====
python manage.py migrate auth
python manage.py migrate sites
python manage.py migrate
echo ===== RUN PYTHON SERVER =====
python -u manage.py runserver 0.0.0.0:8001
