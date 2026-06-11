# AI Yoga Posture Evaluator 🧘

A professional AI-powered web application that detects yoga postures using a webcam, evaluates pose accuracy in real-time, and provides intelligent feedback for form correction.

## 🎯 Project Features

### Core Features
- ✅ Real-time pose detection using MediaPipe
- ✅ Live webcam feed integration
- ✅ Posture accuracy analysis with angle calculations
- ✅ Real-time feedback and correction suggestions
- ✅ Support for multiple yoga poses:
  - Mountain Pose
  - Tree Pose
  - Warrior Pose
  - T Pose

### Advanced Features
- 📊 Accuracy scoring system (0-100%)
- 📈 Session tracking and statistics
- 🎨 Modern responsive UI with dark/light themes
- ⏱️ Session timer and duration tracking
- 📱 Mobile-friendly design
- 🎬 Live video stream processing
- 💾 Session history storage
- 🔄 Real-time angle monitoring
- 📋 Detailed feedback panel

### UI/UX Features
- 🎨 Glassmorphism design
- 🌈 Gradient backgrounds
- ✨ Smooth animations and transitions
- 📱 Responsive layout (Desktop, Tablet, Mobile)
- 🌓 Dark/Light theme toggle
- 🎯 Interactive cards and controls
- 📊 Real-time progress indicators

## 🛠️ Tech Stack

**Backend:**
- Python 3.8+
- Flask (Web Framework)
- OpenCV (Video Processing)
- MediaPipe (Pose Detection)
- NumPy (Mathematical Operations)

**Frontend:**
- HTML5
- CSS3 (Modern Design)
- JavaScript (ES6+)
- Responsive Design

## 📋 Requirements

### System Requirements
- Python 3.8 or higher
- Webcam (for pose detection)
- Modern browser (Chrome, Firefox, Edge, Safari)
- 4GB RAM minimum
- Windows/Mac/Linux

### Python Dependencies
```
Flask==3.0.0
opencv-python==4.8.1.78
mediapipe==0.10.5
numpy==1.24.3
Werkzeug==3.0.0
Jinja2==3.1.2
```

## 🚀 Installation & Setup

### Step 1: Clone or Download Project
```bash
cd c:\projectssmi\yoga\ posture
```

### Step 2: Create Python Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Application
```bash
python app.py
```

The application will start at: **http://localhost:5000**

## 📖 Usage Guide

### Starting the Application
1. Open terminal/command prompt in project folder
2. Activate virtual environment
3. Run `python app.py`
4. Open browser and go to `http://localhost:5000`

### Using the Application

1. **Select Pose**: Choose a yoga pose from the dropdown or poses section
2. **Position Camera**: Sit in front of webcam with full body visible
3. **Start Session**: Click "Start" button to begin evaluation
4. **Monitor Feedback**: Watch real-time accuracy and feedback
5. **Adjust Posture**: Follow suggestions to improve form
6. **End Session**: Click "Stop" to end the session

### Managing Themes
- Click the moon/sun icon in navigation to toggle dark/light mode
- Theme preference is saved automatically

### Tracking Progress
- View session statistics on the Statistics section
- Check session history with timestamps and accuracy scores
- Monitor best accuracy and success rates

## 📁 Project Structure

```
Yoga-AI-Project/
│
├── app.py                    # Main Flask application
├── requirements.txt          # Python dependencies
├── README.md                # Project documentation
│
├── static/
│   ├── style.css            # Modern CSS styling with themes
│   └── script.js            # Interactive JavaScript functionality
│
├── templates/
│   └── index.html           # Main HTML template
│
└── [Virtual Environment]    # Python venv folder
```

## 🎮 API Endpoints

### Get Current Pose Data
```
GET /api/pose
Response: {
    "pose_type": "mountain_pose",
    "pose_name": "Mountain Pose",
    "overall_accuracy": 85.5,
    "pose_correct": true,
    "feedback": ["Keep your back straight", ...],
    "angle_details": {...}
}
```

### Set Active Pose
```
POST /api/pose/set
Body: {"pose_type": "mountain_pose"}
```

### Get Available Poses
```
GET /api/poses
Response: [
    {
        "id": "mountain_pose",
        "name": "Mountain Pose",
        "description": "Stand upright with feet together..."
    },
    ...
]
```

### Start Session
```
POST /api/session/start
Response: {"success": true, "start_time": "2026-05-20T10:30:00"}
```

### End Session
```
POST /api/session/end
Response: {
    "success": true,
    "duration": 120.5,
    "frames_processed": 3600
}
```

### Get Session History
```
GET /api/session/history
Response: {
    "history": [...],
    "total_frames": 3600
}
```

## 🤖 AI Logic Explanation

### Pose Detection Process
1. **Frame Capture**: Webcam frames captured at 30 FPS
2. **Landmark Detection**: MediaPipe detects 33 body landmarks
3. **Angle Calculation**: Calculate angles between joints
4. **Pose Comparison**: Compare with ideal yoga pose angles
5. **Accuracy Scoring**: Calculate overall accuracy percentage
6. **Feedback Generation**: Generate personalized suggestions

### Angle Calculation
- Uses 3-point angle calculation method
- Points: Joint A → Joint B → Joint C
- Calculates angle at Joint B
- Normalized to 0-180 degrees range

### Accuracy Threshold
- **Excellent (80-100%)**: Green status, "Correct Pose"
- **Good (60-79%)**: Orange status, "Nearly Correct"
- **Poor (<60%)**: Red status, "Keep Adjusting"

### Supported Body Joints
- Shoulders (Left/Right)
- Elbows (Left/Right)
- Wrists (Left/Right)
- Hips (Left/Right)
- Knees (Left/Right)
- Ankles (Left/Right)

## 🎨 UI Features

### Dashboard Components
- **Navigation Bar**: Logo, menu, theme toggle
- **Hero Section**: Welcome screen with CTA buttons
- **Camera Section**: Live feed + control panel
- **Analysis Cards**: Real-time metrics display
- **Feedback Panel**: Contextual feedback lists
- **Statistics**: Session tracking and history
- **Footer**: Credits and information

### Design Highlights
- **Glassmorphism**: Frosted glass effect on cards
- **Gradients**: Modern gradient backgrounds
- **Animations**: Smooth transitions and effects
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Complete dark theme implementation
- **Accessibility**: Semantic HTML and ARIA labels

## 🔧 Troubleshooting

### Issue: Webcam not working
**Solution:**
- Check camera permissions
- Ensure no other app is using the webcam
- Restart browser and application

### Issue: Poor pose detection
**Solution:**
- Ensure good lighting
- Position full body in frame
- Keep distance from 2-3 meters from camera
- Ensure clear background

### Issue: High CPU usage
**Solution:**
- Reduce video resolution
- Close other applications
- Update GPU drivers
- Use lower model complexity in MediaPipe settings

### Issue: Module not found errors
**Solution:**
```bash
pip install --upgrade -r requirements.txt
```

### Issue: Port 5000 already in use
**Solution:**
```python
# In app.py, change the port:
app.run(debug=True, port=5001)  # or any other available port
```

## 📊 Supported Yoga Poses

### 1. Mountain Pose 🏔️
- **Ideal Angles**: Knees 180°, Hips 180°, Shoulders 180°
- **Focus**: Alignment, posture, grounding
- **Difficulty**: Beginner

### 2. Tree Pose 🌳
- **Ideal Angles**: One knee bent to 45°, hip open
- **Focus**: Balance, stability, focus
- **Difficulty**: Intermediate

### 3. Warrior Pose ⚔️
- **Ideal Angles**: Front knee 90°, back knee 160°
- **Focus**: Strength, grounding, alignment
- **Difficulty**: Intermediate

### 4. T Pose ✋
- **Ideal Angles**: Arms extended 90°, body neutral
- **Focus**: Alignment, shoulder stability
- **Difficulty**: Beginner

## 🚀 Performance Tips

1. **Optimal Lighting**: Use natural light or bright rooms
2. **Clear Background**: Plain backgrounds work best
3. **Proper Distance**: Stand 2-3 meters from camera
4. **Full Body Visible**: Entire body must be in frame
5. **Minimal Obstructions**: Remove clothing that hides joints

## 📝 Development Notes

### Extending with New Poses
1. Add pose definition in `IDEAL_POSES` dictionary in `app.py`
2. Define ideal angles for key joints
3. Add feedback tips
4. Update frontend pose icons and descriptions

### Customizing Feedback
Edit the `feedback_tips` in each pose definition in `app.py`

### Changing Model Settings
Adjust MediaPipe Pose parameters in `app.py`:
```python
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=1,  # 0 (lite), 1 (full), 2 (heavy)
    smooth_landmarks=True,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)
```

## 🔐 Security Notes

- Application runs locally on localhost by default
- No data is sent to external servers
- Camera feed is not stored or recorded
- Session history stored in browser's localStorage

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as an AI-Powered Yoga Posture Evaluation System

## 🙏 Acknowledgments

- **MediaPipe**: Google's ML framework for pose detection
- **OpenCV**: Computer vision library
- **Flask**: Python web framework

## 📞 Support & Feedback

For issues, suggestions, or contributions, please create an issue or pull request.

---

### 🎉 Happy Yoga Practicing!

Perfect your poses with real-time AI feedback. Start your journey to better posture today!

**Remember**: Consistency is key. Practice regularly for best results! 🧘‍♀️💪

Teammate 
Adharsh GM 
