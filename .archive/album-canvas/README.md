# AlbumCanvas — Dynamic Live Wallpaper & Material You Widgets for Android

[![Live Demo](https://img.shields.io/badge/Live_Demo-Interactive%20Preview-ec4899?style=for-the-badge&logo=googlechrome&logoColor=white)](https://darsheelshokeen.xo.je/album-canvas/)
[![Platform](https://img.shields.io/badge/Platform-Android%2012%2B%20%28API%2031%2B%29-3DDC84?style=for-the-badge&logo=android&logoColor=white)](#)
[![Language](https://img.shields.io/badge/Language-Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)](#)
[![UI Toolkit](https://img.shields.io/badge/UI-Jetpack%20Compose%20%7C%20Material%203-4285F4?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> **AlbumCanvas** dynamically transforms your device's home screen and lock screen into an ambient, living canvas based on currently playing music. Built with **Kotlin**, **Jetpack Compose**, and **Material 3**, it hooks into Android's `MediaSessionManager` to capture real-time album artwork and uses the AndroidX Palette API to generate synchronized ambient blur wallpapers and adaptive home screen widgets.

---

## 🎨 Features & Capabilities

* **🎵 Universal MediaSession Hook**: Automatically detects playback metadata (track title, artist, album art) across all major media players including **Spotify**, **YouTube Music**, **Apple Music**, **SoundCloud**, and local audio players.
* **🌈 Real-Time Color Palette Extraction**: Utilizes quantized color clustering (`Palette.from(bitmap)`) to extract *Dominant*, *Vibrant*, *Vibrant Dark*, and *Muted Light* color swatches on every track transition.
* **📱 Adaptive Material You Widgets**: Glance-based Material 3 home screen widgets that dynamically adapt their typography, play/pause controls, and background glassmorphic tinting to the current album's aesthetic.
* **⚡ Battery-Efficient Rendering**: Built on hardware-accelerated OpenGL / RenderEffect shaders with zero-drain sleep mode when music stops or the screen turns off.
* **✨ Fully Customizable Effects**: Adjust Gaussian blur radius, noise texture overlay, saturation boost, and gradient mesh overlays.

---

## 📋 System Requirements

| Requirement | Specification |
| :--- | :--- |
| **Operating System** | Android 12 (API level 31) or higher |
| **Target SDK** | Android 14+ (API 34+) |
| **Permissions Required** | `POST_NOTIFICATIONS`, `BIND_NOTIFICATION_LISTENER_SERVICE` (for MediaSession access) |
| **Supported Players** | Any Android application exposing standard `MediaSessionCompat` or `MediaController` |

---

## 🛠️ Architecture

```
  [ Media Player (Spotify / YT Music) ]
                 │
                 ▼ (MediaSession State Change)
  [ NotificationListenerService / MediaController ]
                 │
                 ▼ (Extract High-Res Album Bitmap)
     [ AndroidX Palette API ]
                 │
        ┌────────┴────────────────────────┐
        ▼                                 ▼
[ WallpaperService ]              [ Glance AppWidgetProvider ]
Hardware-Accelerated              Material 3 Dynamic Theming
RenderEffect Blur & Mesh          Adaptive Media Controls
```

---

## 💻 Tech Stack

* **Language**: Kotlin 1.9+
* **Declarative UI**: Jetpack Compose & Jetpack Glance (Widgets)
* **Design System**: Material Design 3 (Material You Dynamic Colors)
* **Image Processing**: Coil (Kotlin Image Loading) & AndroidX Palette
* **Architecture**: MVVM + Clean Architecture with Coroutines & StateFlow

---

## 🚀 Interactive Web Preview

Experience the interactive web simulation showing real-time palette extraction and dynamic wallpaper adaptation:  
👉 **[Open AlbumCanvas Web Demo](https://darsheelshokeen.xo.je/album-canvas/)**

---

## 👤 Author

**Darsheel Shokeen**  
*Developer • Creator • Builder*  
* Website: [darsheelshokeen.xo.je](https://darsheelshokeen.xo.je)  
* GitHub: [@DarsheelShokeen](https://github.com/DarsheelShokeen)  
* LinkedIn: [Darsheel Shokeen](https://www.linkedin.com/in/darsheel-shokeen-523833302)

---

## 📄 License

This repository is licensed under the MIT License.
