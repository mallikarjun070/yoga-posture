# 🚀 QUICK START GUIDE

## One-Minute Setup

### Option 1: Automatic Setup (Windows)

Run these commands in PowerShell (one by one):

```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

### Option 2: Automatic Setup (Mac/Linux)

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

## 🌐 Access the Application

Once the application is running, open your browser and go to:

```
http://localhost:5000
```

## ✅ Verify Installation

When you see this message in the terminal:
```
* Running on http://127.0.0.1:5000
* Press CTRL+C to quit
```

Your application is ready! The browser will automatically open, or navigate manually to the URL above.

## 🎮 First Steps

1. **Click "Start Evaluation"** button
2. **Position yourself** in front of the camera
3. **Select a pose** from the dropdown (e.g., Mountain Pose)
4. **Click "Start"** to begin the session
5. **Watch the real-time feedback** as you perform the pose
6. **Check your accuracy score** and follow corrections

## 💡 Pro Tips

- ✨ Use **natural light** for best detection
- 📹 Stay **2-3 meters** away from camera
- 👁️ Ensure **full body is visible**
- 🎯 **Dark backgrounds** work best
- ⏱️ Practice **regularly** for improvement

## 🛑 Stop the Application

Press **Ctrl+C** in the terminal to stop the server.

## 🌓 Toggle Dark Mode

Click the **moon icon** (☀️/🌙) in the top-right corner to switch themes.

## 📊 View Your Progress

1. Go to the **Statistics** section
2. See your **session history**
3. Track your **best accuracy**
4. Monitor your **success rate**

## ⚠️ Common Issues & Fixes

### "ModuleNotFoundError: No module named 'mediapipe'"

```bash
pip install mediapipe
```

### "Cannot access camera"

1. Check camera permissions in Windows Settings
2. Restart the application
3. Try a different browser

### "Port 5000 already in use"

Edit `app.py` and change:
```python
app.run(debug=True, port=5001)  # Change 5000 to 5001
```

### "Slow pose detection"

- Close other applications
- Improve lighting conditions
- Reduce video resolution or model complexity

## 📚 Learn More

Read the full documentation in [README.md](README.md) for:
- Detailed feature explanations
- API endpoint documentation
- Advanced customization
- Troubleshooting guide
- Development notes

## 🎯 Next Steps

1. ✅ Complete the quick start above
2. 📖 Read the full README
3. 🧘 Practice different yoga poses
4. 📊 Track your progress over time
5. 🎨 Customize the application

---

**Ready? Let's start! Run:** `python app.py`
