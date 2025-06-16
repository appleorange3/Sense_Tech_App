
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


