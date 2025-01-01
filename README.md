# to-do-list-app

## About

The application is a simple to-do app that runs on iphone and android phones, the code base can also be converted into java and script from typescript. You can find those builds in the code source provided with this document.

## Prerequisites

1. **Install Expo Go (you do no need to register to use the app)**:
   - **iOS**: [Download Expo Go from the App Store](https://apps.apple.com/us/app/expo-go/id982107779).
   - **Android**: [Download Expo Go from Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).

## Running the App

1. **How to view the app**:
   - Scan the QR code displayed in the terminal using the **Expo Go** app on your phone or by scanning it with your camera.
     The app hosted live and can be viewed by downloading the **Expo Go** app from your app store and scanning the following QR code below:

[Scan this QR code to view the app](https://expo.dev/preview/update?message=set%20addVersionSource&updateRuntimeVersion=1.1.0&createdAt=2024-12-31T01%3A02%3A09.239Z&slug=exp&projectId=ba97eb8d-f733-4ac9-b817-975a16122842&group=9b10e8b7-47f0-4483-a75c-bbc20d22645e).

### If link is not working can scan here

![QR code](./QRupdated.jpg)

## Archtecture Diagram

The following show cases how we structured our code. We have 3 layers, a presentation layer consisting of 3 views auth (login/signup), todo list, and details view with all presentation logic housed. Our second layer is our business logic that houses signup, login, useTodos which handles all our CRUD logic related to our models stored in local storage using ayscneStores to access devices memory for long term storage. The database uses Nosql. We also have a global state which is a domain that access through out the app for tracking the users session interaction, example if logged in or not.

![alt text](./to-do-diagram.jpg)
