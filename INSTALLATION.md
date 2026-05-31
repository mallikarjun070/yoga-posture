# 📋 Complete Installation Guide

## 🖥️ System Requirements

### Hardware
- **CPU**: Intel i5 or equivalent (Core i3 minimum for light usage)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB for project + 100MB for dependencies
- **Webcam**: Integrated or USB webcam

### Software
- **OS**: Windows 10+, macOS 10.14+, Ubuntu 18.04+ or other Linux
- **Python**: 3.8 or higher
- **Browser**: Chrome, Firefox, Edge, or Safari (latest version)

### Network
- Localhost access (no internet required)
- Port 5000 must be available

---

## 📦 Step-by-Step Installation

### Step 1: Install Python

#### Windows
1. Visit https://www.python.org/downloads/
2. Download **Python 3.11** (or latest)
3. Run the installer
4. ✅ **IMPORTANT**: Check "Add Python to PATH"
5. Click "Install Now"
6. Wait for installation to complete

#### Mac
```bash
# Using Homebrew (recommended)
brew install python3

# Or download from python.org
# https://www.python.org/downloads/mac-osx/
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install python3 python3-pip python3-venv
```

### Step 2: Verify Python Installation

Open terminal/command prompt and run:
```bash
python --version
# or
python3 --version
```

You should see: `Python 3.x.x`

---

### Step 3: Download/Clone Project

#### Option A: Direct Download
1. Download as ZIP from repository
2. Extract to a folder (e.g., `C:\Users\YourName\Documents\yoga-ai`)

#### Option B: Using Git
```bash
git clone [repository-url] yoga-ai
cd yoga-ai
```

---

### Step 4: Create Virtual Environment

Virtual environment isolates project dependencies from system Python.

#### Windows (Command Prompt)
```bash
cd path\to\project
python -m venv venv
venv\Scripts\activate
```

#### Windows (PowerShell)
```powershell
cd path\to\project
python -m venv venv
.\venv\Scripts\Activate.ps1
```

#### Mac/Linux
```bash
cd path/to/project
python3 -m venv venv
source venv/bin/activate
```

**You should see `(venv)` in your terminal prompt**

---

### Step 5: Install Dependencies

With virtual environment activated:

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**This installs:**
- Flask (web framework)
- OpenCV (video processing)
- MediaPipe (pose detection)
- NumPy (numerical calculations)

Installation takes 2-5 minutes depending on internet speed.

---

### Step 6: Verify Installation

Test that all packages are installed:

```bash
python -c "import cv2, mediapipe, flask, numpy; print('✓ All packages installed successfully')"
```

---

## 🚀 Running the Application

### Method 1: Simple Command (Recommended)

#### Windows
```bash
python app.py
```

#### Mac/Linux
```bash
python3 app.py
```

### Method 2: Using Main Script

```bash
python main.py
```

This provides enhanced startup information and automatic browser opening.

### Method 3: Using Startup Scripts

#### Windows
Double-click `run.bat` in the project folder
(or run in CMD: `run.bat`)

#### Mac/Linux
```bash
chmod +x run.sh
./run.sh
```

---

## ✅ Verify Application Started

You should see:
```
* Running on http://127.0.0.1:5000
* Press CTRL+C to quit
```

---

## 🌐 Access the Application

Open your browser and go to:
```
http://localhost:5000
```

The application homepage should load with a modern yoga interface.

---

## 🎯 First Run Checklist

- [ ] Python installed and verified
- [ ] Virtual environment activated
- [ ] Dependencies installed without errors
- [ ] Application started successfully
- [ ] Browser opened to http://localhost:5000
- [ ] Webcam is accessible (browser may ask for permission)
- [ ] Select a yoga pose from the dropdown
- [ ] Click "Start Evaluation"

---

## ⚙️ Troubleshooting Installation

### Issue: "Python not found" or "python: command not found"

**Solution:**
1. Verify Python is installed: Check in Control Panel (Windows) or Applications (Mac)
2. Ensure Python is added to PATH:
   - Windows: Reinstall Python and check "Add Python to PATH"
   - Mac/Linux: Use `python3` instead of `python`

### Issue: "ModuleNotFoundError" after installing dependencies

```bash
# Ensure virtual environment is activated
# Then reinstall:
pip install --upgrade -r requirements.txt

# If still failing, try individual packages:
pip install Flask
pip install opencv-python
pip install mediapipe
pip install numpy
```

### Issue: "Permission denied" on Mac/Linux

```bash
# Make scripts executable
chmod +x run.sh

# Or add sudo (use carefully):
sudo chmod +x run.sh
```

### Issue: "Port 5000 already in use"

Edit `app.py` and change port:
```python
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change 5000 to 5001
```

Then access: `http://localhost:5001`

### Issue: Virtual environment not activating

**Windows:**
```powershell
# If you get execution policy error:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then try again:
.\venv\Scripts\Activate.ps1
```

**Mac/Linux:**
```bash
# Try using full path:
source ./venv/bin/activate
```

### Issue: Webcam not accessible

1. Check browser permissions:
   - Chrome: Settings → Privacy → Camera
   - Firefox: Preferences → Privacy → Camera
   - Safari: System Preferences → Security & Privacy → Camera

2. Ensure no other application is using the webcam

3. Try a different browser

4. Restart the computer

### Issue: ImportError with MediaPipe

```bash
# MediaPipe has dependencies that may need installation:
pip install --upgrade mediapipe

# If on Mac/Apple Silicon:
pip install mediapipe-silicon
```

### Issue: Slow or laggy pose detection

**Causes and Solutions:**
- Poor lighting: Use natural light or bright rooms
- Too many applications running: Close unused apps
- Old Intel CPU: Reduce model complexity in `app.py`:
  ```python
  model_complexity=0  # Use lightweight model
  ```
- Weak GPU: Disable GPU and use CPU (edit app.py)

---

## 📁 Directory Structure After Installation

```
yoga-posture/
├── venv/                          # Virtual environment (large folder)
├── static/
│   ├── style.css                 # CSS styles
│   └── script.js                 # JavaScript functionality
├── templates/
│   └── index.html                # Main HTML template
├── app.py                        # Main Flask application
├── main.py                       # Alternative entry point
├── config.py                     # Configuration file
├── requirements.txt              # Dependencies list
├── run.bat                       # Windows startup script
├── run.sh                        # Mac/Linux startup script
├── README.md                     # Full documentation
├── QUICKSTART.md                # Quick start guide
└── INSTALLATION.md              # This file
```

---

## 🔄 Updating Dependencies

To update all packages to latest versions:

```bash
# Activate virtual environment first
pip install --upgrade -r requirements.txt

# Or update individually:
pip install --upgrade Flask opencv-python mediapipe numpy
```

---

## 🗑️ Uninstallation

### To remove the project:

1. **Close the application** (Ctrl+C in terminal)

2. **Deactivate virtual environment:**
   ```bash
   deactivate
   ```

3. **Delete project folder:**
   - Windows: Delete the folder through File Explorer
   - Mac/Linux: `rm -rf /path/to/yoga-posture`

Virtual environment won't affect your system since it's isolated.

---

## 💾 Next Steps After Installation

1. ✅ Run the application
2. 📖 Read the Quick Start guide
3. 🧘 Try different yoga poses
4. 📊 Check your accuracy scores
5. 🎨 Explore the dark mode theme
6. 📈 Track your progress over time

---

## 📞 Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review the README.md file
3. Check Python and library versions match requirements
4. Try running in a fresh virtual environment
5. Ensure all system requirements are met

---

## ✨ Advanced Setup (Optional)

### Using a Different Port

Edit `app.py`:
```python
if __name__ == '__main__':
    app.run(debug=True, port=8000)  # Different port
```

### Disabling Debug Mode (Production)

```python
if __name__ == '__main__':
    app.run(debug=False, port=5000)
```

### Remote Access (Advanced)

```python
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
```
⚠️ Only on secure networks - this allows access from other computers

---

🎉 **Installation complete! Enjoy your AI Yoga Posture Evaluator!**

For more information, see:
- [README.md](README.md) - Full documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [config.py](config.py) - Configuration options
