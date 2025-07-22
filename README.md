
# Welcome to your Expo app 👋
### 🔗 GitHub Repository  
[SenseTech Smart Home Backend](https://github.com/shevkar-shubhra/Sense_Tech_App_Backend)


This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
=======

 📱 Smart Home Controller App – React Native + Java Backend

A mobile application that allows users to control basic home electronic appliances like fans and lights remotely over local Wi-Fi. The system ensures room-level access using Wi-Fi SSID/BSSID verification and secure authentication with JWT tokens. Devices are discovered and controlled using lightweight UDP messaging for fast, real-time interaction.

 🚀 Features

* 🌐 **Wi-Fi Room-Based Login**
  Only users connected to authorized room Wi-Fi networks can access device control features.

* 🔒 **Secure Authentication**
  Java Spring Boot backend with user credential verification and JWT token-based access.

* 📡 **Device Discovery**
  Automatically scans and lists all IoT devices on the same Wi-Fi network using UDP broadcast.

* 🎛️ **Appliance Control**
  Control fans (with speed levels), lights (on/off), and other devices via intuitive UI.

* 📲 **Persistent Sessions**
  Remembers logged-in users and previously discovered devices for quick reuse.

* 🔁 **Real-Time Updates**
  Receives and displays device acknowledgements and current status instantly via UDP.

 
 🧱 Tech Stack

* **Frontend:** React Native (Expo)
* **Backend:** Java Spring Boot (REST API + JWT Authentication)
* **Networking:** UDP Sockets for LAN device discovery & control
* **Storage:** AsyncStorage / SecureStore for token and session management


 🏗️ Architecture Overview

* App launches and checks Wi-Fi (SSID/BSSID).
* Authenticates users via backend, restricted by room Wi-Fi.
* Devices respond to UDP broadcast with capabilities and IP.
* Users send control commands over UDP and receive ACKs.
* Backend handles login, access control, and cloud sync logic.



