# Google Authentication Setup

Guide for configuring Google Sign-In with Firebase in MindEase Mobile.

> **Important**: This project uses native modules and requires a **development build**. It does **NOT** work with Expo Go.

---

## Prerequisites

- Node.js 22+
- Firebase project with Authentication enabled
- Android Studio (for Android builds)
- Xcode (for iOS builds - macOS only)

---

## Quick Setup

### Step 1: Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create or select your project
3. Enable **Authentication > Sign-in method > Google**
4. Register your apps:

**Android:**
- Package name: `com.mindease.mobile`
- SHA-1: Run `cd android && ./gradlew signingReport` (after prebuild)
- Download `google-services.json`

**iOS:**
- Bundle ID: `com.mindease.mobile`
- Download `GoogleService-Info.plist`

### Step 2: Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to **APIs & Services > OAuth consent screen**
4. Configure consent screen (External type for testing)
5. Add test users (required while in test mode)
6. Go to **Credentials** and copy the **Web Client ID**

### Step 3: Project Configuration

1. Place Firebase config files in project root:

```
mind_ease_mobile/
├── google-services.json      # Android
├── GoogleService-Info.plist  # iOS
└── ...
```

2. Create `.env` file:

```bash
cp environment.example .env
```

3. Fill in your Firebase credentials in `.env`

### Step 4: Build

```bash
# Install dependencies
npm install

# Generate native code
npx expo prebuild

# Run on Android
npx expo run:android

# Run on iOS (macOS only)
cd ios && pod install && cd ..
npx expo run:ios
```

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `DEVELOPER_ERROR` | SHA-1 mismatch | Re-add SHA-1 in Firebase, download new `google-services.json` |
| `SIGN_IN_CANCELLED` | OAuth not configured | Check consent screen, add test users |
| `Play Services not available` | Missing Google Play | Use emulator with Google Play image |
| `Invalid bundle ID` | Bundle ID mismatch | Verify `app.json` matches Firebase |

### Get SHA-1

```bash
# After prebuild
cd android && ./gradlew signingReport

# Or using keytool
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

### Clean Rebuild

```bash
rm -rf android ios node_modules
npm install
npx expo prebuild --clean
```

---

## Checklist

- [ ] Firebase project created
- [ ] Google Authentication enabled
- [ ] Android app registered with SHA-1
- [ ] iOS app registered with Bundle ID
- [ ] OAuth consent screen configured
- [ ] Test users added
- [ ] `google-services.json` in project root
- [ ] `GoogleService-Info.plist` in project root
- [ ] `.env` configured
- [ ] Prebuild completed

---

## Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [@react-native-google-signin docs](https://react-native-google-signin.github.io/docs/intro)
- [Expo Config Plugins](https://docs.expo.dev/config-plugins/introduction/)
