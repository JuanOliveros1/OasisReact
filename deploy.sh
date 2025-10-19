#!/bin/bash

# Oasis Campus Safety - Deployment Script
echo "🚀 Deploying Oasis Campus Safety App..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Make sure to set VITE_GOOGLE_MAPS_API_KEY"
    echo "   You can create a .env file with:"
    echo "   echo 'VITE_GOOGLE_MAPS_API_KEY=your_api_key_here' > .env"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the app
echo "🔨 Building the app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Built files are in the 'dist' directory"
    echo ""
    echo "🌐 Deployment options:"
    echo "1. Netlify: npm run deploy:netlify"
    echo "2. Vercel: npm run deploy:vercel"
    echo "3. GitHub Pages: npm run deploy:github"
    echo "4. Manual: Upload 'dist' folder to your hosting provider"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Build failed. Check the errors above."
    exit 1
fi
