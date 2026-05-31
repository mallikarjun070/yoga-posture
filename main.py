#!/usr/bin/env python3
"""
AI Yoga Posture Evaluator - Main Entry Point
Alternative way to run the application
"""

import sys
import os
import webbrowser
import time
from pathlib import Path

def check_environment():
    """Check if all required dependencies are installed"""
    print("🔍 Checking environment...")
    
    required_packages = {
        'cv2': 'opencv-python',
        'mediapipe': 'mediapipe',
        'flask': 'Flask',
        'numpy': 'numpy'
    }
    
    missing_packages = []
    
    for module, package in required_packages.items():
        try:
            __import__(module)
            print(f"✓ {package} installed")
        except ImportError:
            missing_packages.append(package)
            print(f"✗ {package} NOT installed")
    
    if missing_packages:
        print("\n❌ Missing packages detected!")
        print("Run: pip install -r requirements.txt")
        return False
    
    print("\n✅ All dependencies satisfied!\n")
    return True

def main():
    """Main entry point"""
    print("""
    ╔════════════════════════════════════════════════════════════╗
    ║                                                            ║
    ║     🧘 AI YOGA POSTURE EVALUATOR                          ║
    ║                                                            ║
    ║     Version: 1.0.0                                        ║
    ║     Framework: Flask + MediaPipe + OpenCV                 ║
    ║                                                            ║
    ╚════════════════════════════════════════════════════════════╝
    """)
    
    # Check environment
    if not check_environment():
        print("\n⚠️  Setup failed. Please install dependencies and try again.")
        sys.exit(1)
    
    # Import Flask app
    print("📦 Loading application...")
    try:
        from app import app
    except Exception as e:
        print(f"❌ Error loading app: {e}")
        sys.exit(1)
    
    # Print startup information
    print("""
    ╔════════════════════════════════════════════════════════════╗
    ║                    STARTUP INFORMATION                     ║
    ╠════════════════════════════════════════════════════════════╣
    ║                                                            ║
    ║  ✓ Environment verified                                   ║
    ║  ✓ Application loaded                                     ║
    ║                                                            ║
    ║  🌐 Server Starting...                                    ║
    ║     URL: http://localhost:5000                           ║
    ║                                                            ║
    ║  📷 Webcam Access: Required                               ║
    ║  🎯 AI Model: MediaPipe Pose                              ║
    ║                                                            ║
    ║  💡 Tips:                                                 ║
    ║     • Ensure good lighting                                ║
    ║     • Stand 2-3 meters from camera                        ║
    ║     • Full body should be visible                         ║
    ║                                                            ║
    ║  🛑 To stop: Press CTRL+C                                 ║
    ║                                                            ║
    ╚════════════════════════════════════════════════════════════╝
    """)
    
    # Open browser
    print("\n🌐 Opening browser...")
    time.sleep(2)  # Give server time to start
    try:
        webbrowser.open('http://localhost:5000')
        print("✓ Browser opened (if not, visit http://localhost:5000 manually)\n")
    except Exception as e:
        print(f"⚠️  Could not open browser automatically: {e}")
        print("   Please visit http://localhost:5000 manually\n")
    
    # Run Flask app
    try:
        print("🚀 Starting Flask server...\n")
        app.run(
            debug=True,
            threaded=True,
            host='0.0.0.0',
            port=5000,
            use_reloader=False
        )
    except KeyboardInterrupt:
        print("\n\n👋 Shutting down gracefully...")
        print("✓ Application closed")
    except Exception as e:
        print(f"\n❌ Error running application: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
