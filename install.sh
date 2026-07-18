#!/bin/bash

echo "🚀 ContentPulse Installation Script"
echo "===================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 14+"
    exit 1
fi

echo "✓ Node.js $(node -v)"

# Create .env if not exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Edit .env with your AWS credentials"
else
    echo "✓ .env file exists"
fi

# Install backend
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed"
    exit 1
fi
echo "✓ Backend dependencies installed"
cd ..

# Install frontend
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed"
    exit 1
fi
echo "✓ Frontend dependencies installed"
cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "📖 Next steps:"
echo "1. Edit .env with your AWS credentials"
echo "2. Run: cd backend && npm start"
echo "3. In another terminal: cd frontend && npm start"
echo ""
echo "Dashboard will open at http://localhost:3000"
