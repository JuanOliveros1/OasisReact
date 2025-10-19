# 📱 Mobile App Deployment Guide

## Prerequisites

### For Android Development:
- **Android Studio** - Download from [developer.android.com](https://developer.android.com/studio)
- **Java Development Kit (JDK) 11+** - Required for Android development
- **Android SDK** - Installed with Android Studio

### For iOS Development:
- **Xcode** - Download from Mac App Store (macOS only)
- **iOS Simulator** - Included with Xcode
- **Apple Developer Account** - For device testing and App Store deployment

## Quick Start

### 1. Build and Sync
```bash
# Build the web app and sync with mobile platforms
npm run mobile:build
```

### 2. Open in Native IDEs
```bash
# Open Android Studio
npm run mobile:android

# Open Xcode (macOS only)
npm run mobile:ios
```

### 3. Run on Device/Emulator
```bash
# Run on Android device/emulator
npm run mobile:run:android

# Run on iOS device/simulator (macOS only)
npm run mobile:run:ios
```

## Development Workflow

### 1. Make Changes
- Edit your React code in `src/`
- Test in browser with `npm run dev`

### 2. Build and Sync
```bash
npm run mobile:build
```

### 3. Test on Device
- Open Android Studio or Xcode
- Run on device/emulator
- Test all features

### 4. Repeat
- Make changes → Build → Test → Repeat

## Platform-Specific Setup

### Android Setup

#### 1. Install Android Studio
- Download from [developer.android.com](https://developer.android.com/studio)
- Install with default settings
- Accept all license agreements

#### 2. Configure Environment
```bash
# Add to your ~/.bashrc or ~/.zshrc
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### 3. Create Virtual Device
- Open Android Studio
- Go to AVD Manager
- Create a new virtual device
- Choose a device (e.g., Pixel 6)
- Download and select a system image (API 33+)

### iOS Setup (macOS Only)

#### 1. Install Xcode
- Download from Mac App Store
- Install Xcode Command Line Tools: `xcode-select --install`

#### 2. Configure Signing
- Open `ios/App/App.xcworkspace` in Xcode
- Select your development team
- Configure signing certificates

## Building for Production

### Android APK/AAB

#### 1. Generate Signed APK
```bash
# Open Android Studio
npm run mobile:android

# In Android Studio:
# 1. Go to Build → Generate Signed Bundle/APK
# 2. Choose APK or Android App Bundle (AAB)
# 3. Create new keystore or use existing
# 4. Build release version
```

#### 2. Command Line Build
```bash
cd android
./gradlew assembleRelease
# APK will be in android/app/build/outputs/apk/release/
```

### iOS App

#### 1. Archive for App Store
```bash
# Open Xcode
npm run mobile:ios

# In Xcode:
# 1. Select "Any iOS Device" as target
# 2. Go to Product → Archive
# 3. Upload to App Store Connect
```

## App Store Deployment

### Google Play Store (Android)

#### 1. Create Developer Account
- Go to [Google Play Console](https://play.google.com/console)
- Pay $25 one-time registration fee
- Complete developer profile

#### 2. Prepare App
- Create app icon (512x512 PNG)
- Add screenshots
- Write app description
- Set up store listing

#### 3. Upload AAB
- Build signed AAB file
- Upload to Play Console
- Complete store listing
- Submit for review

### Apple App Store (iOS)

#### 1. Create Developer Account
- Go to [Apple Developer](https://developer.apple.com)
- Pay $99/year for developer program
- Complete enrollment

#### 2. Prepare App
- Create app icon (1024x1024 PNG)
- Add screenshots for all device sizes
- Write app description
- Set up App Store Connect listing

#### 3. Upload App
- Archive app in Xcode
- Upload to App Store Connect
- Complete store listing
- Submit for review

## Mobile-Specific Features

### Location Services
The app uses Capacitor Geolocation plugin for:
- Getting user's current location
- Location-based incident reporting
- Campus navigation

### Camera Integration
Capacitor Camera plugin enables:
- Photo evidence in incident reports
- Profile picture uploads
- Document scanning

### Push Notifications
Configure push notifications for:
- Emergency alerts
- Incident updates
- Safety reminders

### Offline Support
- Data persists with localStorage
- Works without internet connection
- Syncs when connection restored

## Testing Checklist

### Android Testing
- [ ] App installs and launches
- [ ] All screens navigate correctly
- [ ] Location services work
- [ ] Camera functionality works
- [ ] Incident reporting works
- [ ] Alerts display properly
- [ ] Data persists between sessions

### iOS Testing
- [ ] App installs and launches
- [ ] All screens navigate correctly
- [ ] Location permissions granted
- [ ] Camera permissions granted
- [ ] Incident reporting works
- [ ] Alerts display properly
- [ ] Data persists between sessions

## Troubleshooting

### Common Issues

#### Android
- **Build fails**: Check Android SDK installation
- **App crashes**: Check device logs in Android Studio
- **Location not working**: Verify location permissions
- **Camera not working**: Check camera permissions

#### iOS
- **Build fails**: Check Xcode and signing setup
- **App crashes**: Check device logs in Xcode
- **Location not working**: Verify location permissions
- **Camera not working**: Check camera permissions

### Debug Commands
```bash
# Check Capacitor status
npx cap doctor

# Sync without building
npx cap sync

# Copy files only
npx cap copy

# Check plugin status
npx cap ls
```

## Performance Optimization

### Build Optimization
- Enable ProGuard for Android (minification)
- Use release builds for testing
- Optimize images and assets
- Enable tree shaking

### Runtime Optimization
- Lazy load components
- Optimize bundle size
- Use efficient state management
- Minimize re-renders

## Security Considerations

### API Keys
- Never commit API keys to version control
- Use environment variables
- Restrict API key permissions
- Rotate keys regularly

### App Permissions
- Request only necessary permissions
- Explain why permissions are needed
- Handle permission denials gracefully
- Follow platform guidelines

---

## Quick Commands Reference

```bash
# Development
npm run dev                    # Start dev server
npm run mobile:build         # Build and sync
npm run mobile:android       # Open Android Studio
npm run mobile:ios          # Open Xcode

# Testing
npm run mobile:run:android   # Run on Android
npm run mobile:run:ios      # Run on iOS

# Production
# Follow platform-specific build guides above
```

Your Oasis Campus Safety app is now ready for mobile deployment! 📱🚀
