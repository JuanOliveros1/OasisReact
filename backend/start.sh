#!/bin/bash

# Oasis Campus Safety Backend Startup Script

echo "🚀 Starting Oasis Campus Safety Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
echo "🌐 Starting server on port 3001..."
echo "📡 API will be available at http://localhost:3001/api"
echo "🏥 Health check: http://localhost:3001/api/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start with nodemon for development
if command -v nodemon &> /dev/null; then
    npm run dev
else
    npm start
fi
