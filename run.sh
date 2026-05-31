#!/bin/bash

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║     YOGA AI SETUP - Mac/Linux                             ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    echo "Please install Python 3.8 or higher from https://www.python.org"
    exit 1
fi

echo "✓ Python $(python3 --version | awk '{print $2}') detected"
echo ""

# Check if virtual environment already exists
if [ -d "venv" ]; then
    echo "✓ Virtual environment found"
else
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "❌ Failed to create virtual environment"
        exit 1
    fi
    echo "✓ Virtual environment created"
fi

echo ""
echo "🔌 Activating virtual environment..."
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "❌ Failed to activate virtual environment"
    exit 1
fi
echo "✓ Virtual environment activated"

echo ""
echo "📥 Installing/Updating dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    echo "Try running: pip install -r requirements.txt"
    exit 1
fi
echo "✓ Dependencies installed"

echo ""
echo "✓ Setup complete!"
echo ""
echo "🚀 Starting application..."
echo "   Opening: http://localhost:5000"
echo ""
echo "🛑 Press CTRL+C to stop the server"
echo ""

python app.py
