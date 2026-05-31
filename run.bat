@ECHO OFF
CLS
TITLE AI Yoga Posture Evaluator

ECHO.
ECHO ╔════════════════════════════════════════════════════════════╗
ECHO ║                                                            ║
ECHO ║     YOGA AI SETUP - Windows                               ║
ECHO ║                                                            ║
ECHO ╚════════════════════════════════════════════════════════════╝
ECHO.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    ECHO ❌ Python is not installed or not in PATH
    ECHO Please install Python 3.8 or higher from https://www.python.org
    PAUSE
    EXIT /B 1
)

ECHO ✓ Python detected
ECHO.

REM Check if virtual environment already exists
if exist "venv" (
    ECHO ✓ Virtual environment found
) else (
    ECHO 📦 Creating virtual environment...
    python -m venv venv
    if %errorlevel% neq 0 (
        ECHO ❌ Failed to create virtual environment
        PAUSE
        EXIT /B 1
    )
    ECHO ✓ Virtual environment created
)

ECHO.
ECHO 🔌 Activating virtual environment...
call venv\Scripts\activate.bat
if %errorlevel% neq 0 (
    ECHO ❌ Failed to activate virtual environment
    PAUSE
    EXIT /B 1
)
ECHO ✓ Virtual environment activated

ECHO.
ECHO 📥 Installing/Updating dependencies...
pip install -q --upgrade pip
pip install -q -r requirements.txt
if %errorlevel% neq 0 (
    ECHO ❌ Failed to install dependencies
    ECHO Try running: pip install -r requirements.txt
    PAUSE
    EXIT /B 1
)
ECHO ✓ Dependencies installed

ECHO.
ECHO ✓ Setup complete!
ECHO.
ECHO 🚀 Starting application...
ECHO    Opening: http://localhost:5000
ECHO.
ECHO 🛑 Press CTRL+C to stop the server
ECHO.

python app.py

PAUSE
