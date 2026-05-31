# AI Yoga Posture Evaluator - Configuration File

# Flask Settings
FLASK_DEBUG = True
FLASK_ENV = "development"
SECRET_KEY = "yoga-ai-secret-key-2026"

# Webcam Settings
WEBCAM_WIDTH = 1280
WEBCAM_HEIGHT = 720
WEBCAM_FPS = 30
CAMERA_WARMUP_FRAMES = 30

# MediaPipe Settings
POSE_DETECTION_MODEL_COMPLEXITY = 1  # 0 (lite), 1 (full), 2 (heavy)
POSE_STATIC_MODE = False
POSE_SMOOTH_LANDMARKS = True
POSE_MIN_DETECTION_CONFIDENCE = 0.7
POSE_MIN_TRACKING_CONFIDENCE = 0.7

# Pose Evaluation Settings
ACCURACY_THRESHOLD = 75  # % - Pose is considered correct above this
ANGLE_TOLERANCE_DEFAULT = 15  # degrees

# Session Settings
SESSION_AUTO_SAVE = True
MAX_HISTORY_ITEMS = 100

# UI Settings
THEME_DEFAULT = "light-theme"  # light-theme or dark-theme
ANIMATION_ENABLED = True

# Feedback Settings
FEEDBACK_MAX_ITEMS = 5
FEEDBACK_UPDATE_INTERVAL = 500  # milliseconds

# Server Settings
SERVER_HOST = "0.0.0.0"
SERVER_PORT = 5000
SERVER_THREADED = True

# Logging
LOG_LEVEL = "INFO"
LOG_FILE = "app.log"

# Performance Settings
ENABLE_PERFORMANCE_METRICS = True
FRAME_SKIP_INTERVAL = 1  # Process every nth frame (1 = all frames)
