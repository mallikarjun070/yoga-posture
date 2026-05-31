from flask import Flask, render_template, jsonify, request, Response
import cv2
import mediapipe as mp
import numpy as np
import os
import base64
from collections import deque
import threading
import time
from datetime import datetime
import json

app = Flask(__name__)

# MediaPipe Pose Detection
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=1,
    smooth_landmarks=True,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)

# Global variables
camera = None
current_frame = None
pose_data = None
session_history = []
current_session_start = None
frame_count = 0

# Define ideal yoga pose angles (in degrees)
IDEAL_POSES = {
    'tree_pose': {
        'name': 'Tree Pose',
        'description': 'Stand on one leg while placing the other foot on the inner thigh',
        'key_angles': {
            'left_knee': (85, 45),  # (ideal, tolerance)
            'right_knee': (85, 45),
            'left_hip': (180, 15),
            'right_hip': (180, 15),
            'left_shoulder': (45, 20),
            'right_shoulder': (45, 20),
        },
        'feedback_tips': [
            'Keep your back straight',
            'Engage your core muscles',
            'Focus on a fixed point for balance',
            'Distribute weight evenly on standing leg'
        ]
    },
    'warrior_pose': {
        'name': 'Warrior Pose',
        'description': 'Stand with legs wide apart, bend front knee',
        'key_angles': {
            'left_knee': (90, 15),
            'right_knee': (160, 15),
            'left_hip': (90, 20),
            'right_hip': (90, 20),
            'left_shoulder': (90, 20),
            'right_shoulder': (90, 20),
        },
        'feedback_tips': [
            'Keep your front knee aligned with ankle',
            'Square your hips forward',
            'Extend arms above shoulders',
            'Ground both feet firmly'
        ]
    },
    'mountain_pose': {
        'name': 'Mountain Pose',
        'description': 'Stand upright with feet together, arms at sides',
        'key_angles': {
            'left_knee': (180, 10),
            'right_knee': (180, 10),
            'left_hip': (180, 10),
            'right_hip': (180, 10),
            'left_shoulder': (180, 15),
            'right_shoulder': (180, 15),
        },
        'feedback_tips': [
            'Press feet firmly into ground',
            'Keep spine neutral and straight',
            'Relax shoulders away from ears',
            'Distribute weight evenly between feet'
        ]
    },
    't_pose': {
        'name': 'T Pose',
        'description': 'Stand with arms extended to the sides at shoulder height',
        'key_angles': {
            'left_knee': (180, 10),
            'right_knee': (180, 10),
            'left_elbow': (180, 10),
            'right_elbow': (180, 10),
            'left_shoulder': (90, 15),
            'right_shoulder': (90, 15),
        },
        'feedback_tips': [
            'Extend arms fully to sides',
            'Keep shoulders relaxed',
            'Stand with feet hip-width apart',
            'Maintain neutral spine'
        ]
    }
}

def calculate_angle(a, b, c):
    """Calculate angle between three points"""
    a = np.array(a)  # First point
    b = np.array(b)  # Mid point
    c = np.array(c)  # End point
    
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    
    if angle > 180.0:
        angle = 360 - angle
    
    return angle

def get_landmark_position(landmarks, pose_part):
    """Get landmark position safely"""
    landmark_map = {
        'nose': 0, 'forehead': 10,
        'left_shoulder': 11, 'right_shoulder': 12,
        'left_elbow': 13, 'right_elbow': 14,
        'left_wrist': 15, 'right_wrist': 16,
        'left_hip': 23, 'right_hip': 24,
        'left_knee': 25, 'right_knee': 26,
        'left_ankle': 27, 'right_ankle': 28,
    }
    
    if pose_part in landmark_map:
        idx = landmark_map[pose_part]
        if idx < len(landmarks):
            lm = landmarks[idx]
            return [lm.x, lm.y, lm.z]
    return None

def analyze_pose(landmarks, pose_type='mountain_pose'):
    """Analyze pose accuracy"""
    if pose_type not in IDEAL_POSES:
        pose_type = 'mountain_pose'
    
    ideal_pose = IDEAL_POSES[pose_type]
    accuracy_scores = {}
    feedback = []
    
    # Calculate current angles
    angles = {}
    
    # Calculate key angles based on pose type
    left_shoulder = get_landmark_position(landmarks, 'left_shoulder')
    right_shoulder = get_landmark_position(landmarks, 'right_shoulder')
    left_elbow = get_landmark_position(landmarks, 'left_elbow')
    right_elbow = get_landmark_position(landmarks, 'right_elbow')
    left_hip = get_landmark_position(landmarks, 'left_hip')
    right_hip = get_landmark_position(landmarks, 'right_hip')
    left_knee = get_landmark_position(landmarks, 'left_knee')
    right_knee = get_landmark_position(landmarks, 'right_knee')
    left_ankle = get_landmark_position(landmarks, 'left_ankle')
    right_ankle = get_landmark_position(landmarks, 'right_ankle')
    
    # Calculate angles
    if all([left_shoulder, left_elbow, left_wrist := get_landmark_position(landmarks, 'left_wrist')]):
        angles['left_shoulder'] = calculate_angle(left_elbow, left_shoulder, right_shoulder)
    
    if all([right_shoulder, right_elbow, right_wrist := get_landmark_position(landmarks, 'right_wrist')]):
        angles['right_shoulder'] = calculate_angle(right_elbow, right_shoulder, left_shoulder)
    
    if all([left_hip, left_knee, left_ankle]):
        angles['left_knee'] = calculate_angle(left_hip, left_knee, left_ankle)
    
    if all([right_hip, right_knee, right_ankle]):
        angles['right_knee'] = calculate_angle(right_hip, right_knee, right_ankle)
    
    if all([left_shoulder, left_hip, right_hip]):
        angles['left_hip'] = calculate_angle(left_shoulder, left_hip, right_hip)
    
    if all([right_shoulder, right_hip, left_hip]):
        angles['right_hip'] = calculate_angle(right_shoulder, right_hip, left_hip)
    
    # Calculate left and right elbow angles
    if all([left_shoulder, left_elbow, left_wrist]):
        angles['left_elbow'] = calculate_angle(left_shoulder, left_elbow, left_wrist)
    
    if all([right_shoulder, right_elbow, right_wrist]):
        angles['right_elbow'] = calculate_angle(right_shoulder, right_elbow, right_wrist)
    
    # Check accuracy for each key angle
    total_accuracy = 0
    checked_angles = 0
    
    for angle_name, (ideal_angle, tolerance) in ideal_pose['key_angles'].items():
        if angle_name in angles:
            current_angle = angles[angle_name]
            difference = abs(current_angle - ideal_angle)
            
            if difference <= tolerance:
                accuracy = 100
            else:
                accuracy = max(0, 100 - (difference - tolerance) * 2)
            
            accuracy_scores[angle_name] = {
                'ideal': ideal_angle,
                'current': round(current_angle, 1),
                'accuracy': round(accuracy, 1)
            }
            
            total_accuracy += accuracy
            checked_angles += 1
            
            # Generate feedback
            if accuracy < 80:
                if angle_name == 'left_knee':
                    feedback.append('Adjust your left knee angle')
                elif angle_name == 'right_knee':
                    feedback.append('Adjust your right knee angle')
                elif angle_name == 'left_shoulder':
                    feedback.append('Adjust your left shoulder position')
                elif angle_name == 'right_shoulder':
                    feedback.append('Adjust your right shoulder position')
                elif angle_name == 'left_hip':
                    feedback.append('Adjust your left hip position')
                elif angle_name == 'right_hip':
                    feedback.append('Adjust your right hip position')
    
    # Add pose-specific tips
    feedback.extend(ideal_pose['feedback_tips'])
    
    overall_accuracy = (total_accuracy / checked_angles) if checked_angles > 0 else 0
    
    return {
        'pose_type': pose_type,
        'pose_name': ideal_pose['name'],
        'overall_accuracy': round(overall_accuracy, 1),
        'angle_details': accuracy_scores,
        'feedback': feedback[:5],  # Limit to 5 feedback items
        'pose_correct': overall_accuracy >= 75
    }

def generate_frames():
    """Generate frames from webcam"""
    global camera, current_frame, pose_data, frame_count
    
    camera = cv2.VideoCapture(0)
    camera.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    camera.set(cv2.CAP_PROP_FPS, 30)
    
    while True:
        success, frame = camera.read()
        if not success:
            break
        
        frame_count += 1
        
        # Flip for selfie-view
        frame = cv2.flip(frame, 1)
        h, w, c = frame.shape
        
        # Convert to RGB
        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Pose detection
        results = pose.process(image_rgb)
        
        # Draw pose landmarks
        if results.pose_landmarks:
            mp_drawing.draw_landmarks(
                frame,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=2)
            )
            
            # Analyze pose (using default mountain pose for demo)
            pose_data = analyze_pose(results.pose_landmarks.landmark, 'mountain_pose')
        
        # Add status text
        if pose_data:
            accuracy = pose_data['overall_accuracy']
            status = 'CORRECT' if pose_data['pose_correct'] else 'INCORRECT'
            color = (0, 255, 0) if pose_data['pose_correct'] else (0, 0, 255)
            
            cv2.putText(frame, f"Accuracy: {accuracy}%", (20, 40), 
                       cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
            cv2.putText(frame, f"Status: {status}", (20, 80),
                       cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
        
        # Encode frame
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        
        current_frame = frame
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    """Video feed endpoint"""
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/pose', methods=['GET'])
def get_pose():
    """Get current pose data"""
    if pose_data:
        return jsonify(pose_data)
    # Return 200 with an explicit payload when no pose has been detected yet.
    return jsonify({'error': 'No pose detected', 'pose_data': None}), 200

@app.route('/api/pose/set', methods=['POST'])
def set_pose():
    """Set current pose type"""
    data = request.json
    pose_type = data.get('pose_type', 'mountain_pose')
    
    if pose_type in IDEAL_POSES:
        return jsonify({'success': True, 'pose': pose_type})
    return jsonify({'success': False, 'error': 'Invalid pose type'}), 400

@app.route('/api/poses', methods=['GET'])
def get_poses():
    """Get available poses"""
    poses = []
    for key, value in IDEAL_POSES.items():
        poses.append({
            'id': key,
            'name': value['name'],
            'description': value['description']
        })
    return jsonify(poses)

@app.route('/api/session/start', methods=['POST'])
def start_session():
    """Start a tracking session"""
    global current_session_start, session_history
    current_session_start = datetime.now()
    session_history = []
    return jsonify({'success': True, 'start_time': current_session_start.isoformat()})

@app.route('/api/session/end', methods=['POST'])
def end_session():
    """End a tracking session"""
    global current_session_start
    if current_session_start:
        duration = (datetime.now() - current_session_start).total_seconds()
        current_session_start = None
        return jsonify({
            'success': True,
            'duration': duration,
            'frames_processed': frame_count
        })
    return jsonify({'success': False}), 400

@app.route('/api/session/history', methods=['GET'])
def get_history():
    """Get session history"""
    return jsonify({
        'history': session_history,
        'total_frames': frame_count
    })

@app.route('/api/feedback', methods=['GET'])
def get_feedback():
    """Get current feedback"""
    if pose_data:
        return jsonify({
            'feedback': pose_data['feedback'],
            'accuracy': pose_data['overall_accuracy']
        })
    return jsonify({'feedback': [], 'accuracy': 0})

@app.route('/api/upload', methods=['POST'])
def upload_image():
    """Handle image upload and pose analysis"""
    try:
        # Check if file is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        # Read image
        file_stream = file.read()
        nparr = np.frombuffer(file_stream, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            return jsonify({'error': 'Invalid image'}), 400
        
        # Process image
        original_image = image.copy()
        h, w = image.shape[:2]
        
        # Convert to RGB for MediaPipe
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Run pose detection
        results = pose.process(image_rgb)
        
        # Draw skeleton on image
        if results.pose_landmarks:
            mp_drawing.draw_landmarks(
                image,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=2)
            )
            
            # Analyze pose
            analysis = analyze_pose(results.pose_landmarks.landmark, 'mountain_pose')
        else:
            analysis = {
                'pose_type': 'unknown',
                'pose_name': 'No Pose Detected',
                'overall_accuracy': 0,
                'angle_details': {},
                'feedback': ['No human body detected in image'],
                'pose_correct': False
            }
        
        # Encode images to base64
        _, original_buffer = cv2.imencode('.jpg', original_image)
        original_b64 = base64.b64encode(original_buffer).decode('utf-8')
        
        _, skeleton_buffer = cv2.imencode('.jpg', image)
        skeleton_b64 = base64.b64encode(skeleton_buffer).decode('utf-8')
        
        # Prepare response
        response = {
            'original_image': original_b64,
            'skeleton_image': skeleton_b64,
            'pose_type': analysis['pose_type'],
            'pose_name': analysis['pose_name'],
            'accuracy': analysis['overall_accuracy'],
            'feedback': analysis['feedback'],
            'pose_correct': analysis['pose_correct'],
            'angle_details': analysis['angle_details']
        }
        
        return jsonify(response)
        
    except Exception as e:
        print(f"Upload error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, threaded=True, host='0.0.0.0', port=5000)
