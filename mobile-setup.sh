#!/bin/bash

# Oasis Campus Safety - Mobile App Setup Script
echo "📱 Setting up Oasis Campus Safety Mobile App..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the web app
echo "🔨 Building web app..."
npm run build

# Sync with mobile platforms
echo "🔄 Syncing with mobile platforms..."
npx cap sync

echo ""
echo "✅ Mobile setup complete!"
echo ""
echo "📱 Next steps:"
echo ""
echo "Android:"
echo "1. Install Android Studio from https://developer.android.com/studio"
echo "2. Run: npm run mobile:android"
echo "3. Open the project in Android Studio"
echo "4. Run on device or emulator"
echo ""
echo "iOS (macOS only):"
echo "1. Install Xcode from Mac App Store"
echo "2. Fix CocoaPods encoding issue:"
echo "   export LANG=en_US.UTF-8"
echo "   cd ios && pod install"
echo "3. Run: npm run mobile:ios"
echo "4. Open the project in Xcode"
echo "5. Run on device or simulator"
echo ""
echo "🚀 Your app is ready for mobile development!"
