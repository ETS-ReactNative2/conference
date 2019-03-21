# Conference

This Git repository hosts two distinct applications which talk to each other:

* A Django backend and web application, under `conference/`.
* A React Native mobile application, under `mobile/`.

# Introduction

The Conference app was the app for Luna's blockchain conference Block Seoul.

## Technology

- Django 1
    - For compatibility with Symposion
- Python 2
    - For compatibility with Symposion
- Symposion
    - Django app for supporting a conference schedule with speaker self-registration. We ended up using nothing of Symposion except the datastructure for the schedule, which we filled manually and retrieved via a modified API endpoint.
- Amazon Web Services
    - Elastic Beanstalk

## Authorization

The conference app uses token authentication.

Post to `/users/` to register a user.

Post to `/api-token-auth/` with `username` and `password` set (JSON, form-data and x-www-form-urlencoded supported) to obtain the token.

Post to any other API with HTTP-Header `Authorization: Bearer <token>`.

In Postman, create a global variable named `TOKEN` with your token.

# Launching Django backend

## Requirements:  
1. `docker`
2. `docker-compose`

## Running:  
1. Execute `docker-compose up -d` in the root directory of the repository.
2. Check if containers started with `docker ps`.
3. Attach your terminal to logs coming from `Django backend` with `docker logs --follow python`
4. You can now access database via `localhost:5432` with credentials used in `docker-compose.yml`
5. You can now access backend via `localhost:8001`

# Launching Mobile application

## Requirements:  
1. `Node 8.15+`
2. `Java JDK 1.8`
3. `Android Studio` for building and launching app on your Android device / emulator
4. `XCode 9+` for building and launching app on your IOS device / emulator

## Launching dev build on Android (steps for Mac):  
1. Run `npm ci`
2. Add ANDROID_HOME env variable pointing to SDK location (this is used by react-native to locate SDK): `echo 'export ANDROID_HOME=/Users/$USER/Library/Android/sdk' >> ~/.bash_profilesource ~/.bash_profile`
3. Add Android Platform Tools to your path: `echo 'export PATH=${PATH}:/Users/$USER/Library/Android/sdk/tools:/Users/$USER/Library/Android/sdk/platform-tools' >> ~/.bash_profilesource ~/.bash_profile`
4. Now you should be able to run `adb` commands. Try `adb devices` to see if any output comes out.
5. Connect your device via USB, enable `USB debugging` and check if `adb devices` shows your device.
6. Change `APP_AXIOS_BASE_URL=` in `.env.development` to IP address of your machine running the backend, for example: `APP_AXIOS_BASE_URL=http://192.168.0.1:8001`
7. Run `npm run android-dev` to start dev build and app on connected device / emulator.

## Launching dev build on IOS (steps for Mac):  
1. Run `npm ci`
2. Change `APP_AXIOS_BASE_URL=` in `.env.development` to IP address of your machine running the backend, for example: `APP_AXIOS_BASE_URL=http://192.168.0.1:8001`
3. Launch XCode project (`mobile/ios/Luna.xcodeproj`)
4. Connect your device / use emulator
5. Select `Dev` scheme in XCode and Run it

Additional steps for XCode 10+:  
1. Run `cd ./node_modules/react-native/third-party/glog-0.3.4 && ../../scripts/ios-configure-glog.sh` in `mobile` directory
2. Add references to `libfishhook`: https://user-images.githubusercontent.com/637225/41004316-d626d112-68ef-11e8-8a5e-397a55777bc4.png
