// Global Variables
let sessionActive = false;
let sessionStartTime = null;
let timerInterval = null;
let sessionHistory = [];
let bestAccuracy = 0;
let successCount = 0;
let totalCount = 0;

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);

    // Load pose data
    loadPoses();

    // Load session history
    loadHistory();

    // Update stats
    updateStats();

    // Setup theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Setup navigation
    setupNavigation();

    // Setup smooth scrolling
    setupSmoothScroll();
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
        updateThemeIcon('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        updateThemeIcon('dark-theme');
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (theme === 'dark-theme') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.add('fa-moon');
        icon.classList.remove('fa-sun');
    }
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const href = this.getAttribute('href');
            const section = document.querySelector(href);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Smooth Scrolling
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Load Available Poses
async function loadPoses() {
    try {
        const response = await fetch('/api/poses');
        const poses = await response.json();
        
        const container = document.getElementById('posesContainer');
        container.innerHTML = '';
        
        poses.forEach(pose => {
            const poseCard = createPoseCard(pose);
            container.appendChild(poseCard);
        });
    } catch (error) {
        console.error('Error loading poses:', error);
    }
}

function createPoseCard(pose) {
    const card = document.createElement('div');
    card.className = 'pose-card';
    
    const icons = {
        'mountain_pose': '🏔️',
        'tree_pose': '🌳',
        'warrior_pose': '⚔️',
        't_pose': '✋'
    };
    
    card.innerHTML = `
        <div class="pose-card-header">
            <span class="pose-icon">${icons[pose.id] || '🧘'}</span>
            <h3>${pose.name}</h3>
        </div>
        <p>${pose.description}</p>
        <button class="btn btn-primary" onclick="selectPose('${pose.id}')">
            <i class="fas fa-check"></i> Select
        </button>
    `;
    
    return card;
}

function selectPose(poseId) {
    document.getElementById('poseSelect').value = poseId;
    setPose(poseId);
    scrollToSection('#camera');
}

// Pose Management
async function setPose(poseId) {
    try {
        const response = await fetch('/api/pose/set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pose_type: poseId })
        });
        
        if (response.ok) {
            showNotification(`Pose changed to: ${poseId}`);
        }
    } catch (error) {
        console.error('Error setting pose:', error);
    }
}

// Session Management
async function startSession() {
    try {
        sessionActive = true;
        sessionStartTime = Date.now();
        
        // Disable buttons
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        document.getElementById('poseSelect').disabled = true;
        
        // Start timer
        timerInterval = setInterval(updateTimer, 1000);
        
        // Fetch initial data
        updatePoseData();
        
        // Poll for updates every 500ms
        const pollInterval = setInterval(async () => {
            if (!sessionActive) {
                clearInterval(pollInterval);
                return;
            }
            updatePoseData();
        }, 500);
        
        showNotification('Session started!', 'success');
    } catch (error) {
        console.error('Error starting session:', error);
        showNotification('Failed to start session', 'error');
    }
}

async function stopSession() {
    try {
        sessionActive = false;
        
        // Clear timer
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        // Enable buttons
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        document.getElementById('poseSelect').disabled = false;
        
        // Save session
        const duration = (Date.now() - sessionStartTime) / 1000;
        const accuracy = parseFloat(document.getElementById('accuracyPercent').textContent);
        
        const session = {
            timestamp: new Date().toLocaleString(),
            duration: formatTime(duration),
            accuracy: accuracy,
            pose: document.getElementById('poseSelect').value
        };
        
        sessionHistory.unshift(session);
        localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
        
        updateStats();
        showNotification('Session ended!', 'success');
        
    } catch (error) {
        console.error('Error stopping session:', error);
        showNotification('Failed to stop session', 'error');
    }
}

function resetSession() {
    sessionActive = false;
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('poseSelect').disabled = false;
    document.getElementById('timerDisplay').innerHTML = '<span class="timer-value">00:00</span>';
    document.getElementById('sessionInfo').textContent = 'No active session';
    document.getElementById('accuracyPercent').textContent = '0';
    updateAccuracyCircle(0);
    
    showNotification('Session reset', 'info');
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.innerHTML = `<span class="timer-value">${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</span>`;
    
    const poseSelect = document.getElementById('poseSelect').value;
    const poseName = getPoseName(poseSelect);
    document.getElementById('sessionInfo').textContent = `Active Session: ${poseName}`;
}

// Pose Data Update
async function updatePoseData() {
    try {
        const response = await fetch('/api/pose');
        
        if (!response.ok) {
            updateCameraStatus('No pose detected');
            return;
        }
        
        const data = await response.json();
        updateUI(data);
        updateCameraStatus('Pose detected');
        
    } catch (error) {
        console.error('Error fetching pose data:', error);
    }
}

function updateUI(data) {
    // Update accuracy
    const accuracy = data.overall_accuracy || 0;
    document.getElementById('accuracyPercent').textContent = accuracy;
    updateAccuracyCircle(accuracy);
    
    // Update status
    const statusEl = document.getElementById('accuracyStatus');
    if (data.pose_correct) {
        statusEl.textContent = '✓ Correct Posture!';
        statusEl.style.color = 'var(--success-color)';
    } else {
        statusEl.textContent = '✗ Keep Adjusting';
        statusEl.style.color = 'var(--danger-color)';
    }
    
    // Update feedback
    updateFeedback(data.feedback || []);
    
    // Update angle details
    updateAngleDetails(data.angle_details || {});
    
    // Update pose status
    updatePoseStatus(data);
}

function updateAccuracyCircle(accuracy) {
    const circle = document.getElementById('accuracyCircle');
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (accuracy / 100) * circumference;
    
    circle.style.strokeDashoffset = strokeDashoffset;
    
    // Update color based on accuracy
    if (accuracy >= 80) {
        circle.style.stroke = '#10b981'; // Green
    } else if (accuracy >= 60) {
        circle.style.stroke = '#f59e0b'; // Orange
    } else {
        circle.style.stroke = '#ef4444'; // Red
    }
}

function updateFeedback(feedback) {
    const feedbackList = document.getElementById('feedbackList');
    
    if (feedback.length === 0) {
        feedbackList.innerHTML = '<p class="placeholder">Waiting for feedback...</p>';
        return;
    }
    
    feedbackList.innerHTML = feedback.map(tip => 
        `<p><i class="fas fa-lightbulb"></i> ${tip}</p>`
    ).join('');
}

function updateAngleDetails(angles) {
    const angleDetails = document.getElementById('angleDetails');
    
    if (Object.keys(angles).length === 0) {
        angleDetails.innerHTML = '';
        return;
    }
    
    const details = Object.entries(angles).map(([name, data]) => {
        const accuracy = data.accuracy || 0;
        const color = accuracy >= 80 ? '#10b981' : accuracy >= 60 ? '#f59e0b' : '#ef4444';
        
        return `
            <div class="angle-item" style="border-left: 3px solid ${color}; padding-left: 10px;">
                <span>${formatAngleName(name)}</span>
                <span>${data.current}° (${accuracy}%)</span>
            </div>
        `;
    }).join('');
    
    angleDetails.innerHTML = details;
}

function updatePoseStatus(data) {
    const statusEl = document.getElementById('poseStatus');
    const statusColor = data.pose_correct ? 'var(--success-color)' : 'var(--danger-color)';
    const statusText = data.pose_correct ? 'CORRECT' : 'INCORRECT';
    
    statusEl.innerHTML = `<p style="color: ${statusColor}; font-weight: bold;">Status: ${statusText}</p>`;
}

function updateCameraStatus(status) {
    document.getElementById('cameraStatus').textContent = status;
}

function getPoseName(poseId) {
    const poseNames = {
        'mountain_pose': 'Mountain Pose',
        'tree_pose': 'Tree Pose',
        'warrior_pose': 'Warrior Pose',
        't_pose': 'T Pose'
    };
    return poseNames[poseId] || poseId;
}

function formatAngleName(name) {
    return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + ' Angle';
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// History Management
function loadHistory() {
    const savedHistory = localStorage.getItem('sessionHistory');
    if (savedHistory) {
        sessionHistory = JSON.parse(savedHistory);
    }
}

function updateStats() {
    const totalSessions = sessionHistory.length;
    let totalTime = 0;
    let totalAccuracy = 0;
    
    sessionHistory.forEach(session => {
        // Parse time
        const timeParts = session.duration.split(':');
        const seconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
        totalTime += seconds;
        
        // Accuracy
        totalAccuracy += session.accuracy;
        bestAccuracy = Math.max(bestAccuracy, session.accuracy);
        
        // Success count
        if (session.accuracy >= 75) {
            successCount++;
        }
        totalCount++;
    });
    
    // Update UI
    document.getElementById('totalSessions').textContent = totalSessions;
    
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    document.getElementById('totalTime').textContent = `${hours}h ${minutes}m`;
    
    document.getElementById('bestAccuracy').textContent = `${Math.round(bestAccuracy)}%`;
    
    const successRate = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0;
    document.getElementById('successRate').textContent = `${successRate}%`;
    
    // Update history
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    
    if (sessionHistory.length === 0) {
        historyList.innerHTML = '<p class="placeholder">No sessions recorded yet</p>';
        return;
    }
    
    const historyHTML = sessionHistory.slice(0, 10).map(session => {
        const accuracyColor = session.accuracy >= 75 ? '#10b981' : '#ef4444';
        
        return `
            <div class="history-item">
                <div class="history-item-info">
                    <p><strong>${getPoseName(session.pose)}</strong></p>
                    <p class="history-item-time">${session.timestamp}</p>
                </div>
                <div style="text-align: right;">
                    <p class="history-item-accuracy" style="color: ${accuracyColor}">${session.accuracy}%</p>
                    <p style="font-size: 0.9em; color: rgba(0,0,0,0.6);">${session.duration}</p>
                </div>
            </div>
        `;
    }).join('');
    
    historyList.innerHTML = historyHTML;
}

// Notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        background: white;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    }
    
    .notification-success {
        background: #10b981;
        color: white;
    }
    
    .notification-error {
        background: #ef4444;
        color: white;
    }
    
    .notification-info {
        background: #3b82f6;
        color: white;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize on load
window.addEventListener('load', function() {
    showNotification('Welcome to AI Yoga Posture Evaluator!', 'info');
});

// Handle page visibility
document.addEventListener('visibilitychange', function() {
    if (document.hidden && sessionActive) {
        updateCameraStatus('Session paused - tab inactive');
    } else if (!document.hidden && sessionActive) {
        updateCameraStatus('Session resumed');
    }
});

// ====== Image Upload Functionality ======

// Initialize upload area
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    
    if (uploadArea) {
        // Drag and drop events
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleImageUpload(files[0]);
            }
        });
        
        // File input change
        imageInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleImageUpload(e.target.files[0]);
            }
        });
    }
});

function handleImageUpload(file) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        showNotification('Please upload a JPG or PNG image', 'error');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File size must be less than 5MB', 'error');
        return;
    }
    
    // Read and preview image
    const reader = new FileReader();
    reader.onload = (e) => {
        const imgData = e.target.result;
        
        // Show preview
        document.getElementById('previewImage').src = imgData;
        document.getElementById('previewContainer').classList.remove('hidden');
        document.getElementById('uploadArea').classList.add('hidden');
        
        // Store file for analysis
        window.uploadedFile = file;
        window.uploadedImageData = imgData;
    };
    reader.readAsDataURL(file);
}

async function analyzeImage() {
    if (!window.uploadedFile) {
        showNotification('No image selected', 'error');
        return;
    }
    
    // Show loading
    showLoading(true);
    document.getElementById('analyzeBtn').disabled = true;
    
    try {
        // Create FormData
        const formData = new FormData();
        formData.append('image', window.uploadedFile);
        
        // Send to server
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Upload failed');
        }
        
        const result = await response.json();
        
        // Display results
        displayAnalysisResults(result);
        showNotification('Analysis complete!', 'success');
        
    } catch (error) {
        console.error('Analysis error:', error);
        showNotification('Failed to analyze image: ' + error.message, 'error');
    } finally {
        showLoading(false);
        document.getElementById('analyzeBtn').disabled = false;
    }
}

function displayAnalysisResults(result) {
    // Hide preview, show results
    document.getElementById('previewContainer').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('hidden');
    
    // Display images
    if (result.original_image) {
        document.getElementById('resultOriginal').src = 'data:image/jpeg;base64,' + result.original_image;
    }
    if (result.skeleton_image) {
        document.getElementById('resultSkeleton').src = 'data:image/jpeg;base64,' + result.skeleton_image;
    }
    
    // Display accuracy
    const accuracy = result.accuracy || 0;
    document.getElementById('resultAccuracy').textContent = Math.round(accuracy);
    document.getElementById('resultAccuracyStatus').textContent = 
        accuracy >= 75 ? '✓ Good Posture' : (accuracy >= 50 ? '⚠ Needs Improvement' : '✗ Incorrect Posture');
    
    // Update accuracy circle
    const circle = document.getElementById('resultAccuracyCircle');
    if (circle) {
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (accuracy / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
    
    // Display feedback
    const feedbackList = document.getElementById('resultFeedback');
    feedbackList.innerHTML = '';
    if (result.feedback && result.feedback.length > 0) {
        result.feedback.forEach(item => {
            const feedbackItem = document.createElement('div');
            feedbackItem.className = 'feedback-item';
            feedbackItem.innerHTML = `<i class="fas fa-lightbulb"></i> ${item}`;
            feedbackList.appendChild(feedbackItem);
        });
    } else {
        feedbackList.innerHTML = '<p class="placeholder">Great posture!</p>';
    }
    
    // Display pose info
    const poseInfo = document.getElementById('detectedPoseInfo');
    poseInfo.innerHTML = `
        <h2>${result.pose_name || 'Unknown'}</h2>
        <p><strong>Detected Pose:</strong> ${result.pose_type || 'N/A'}</p>
        <p><strong>Status:</strong> ${result.pose_correct ? '✓ Correct' : '✗ Incorrect'}</p>
        <p><strong>Confidence:</strong> ${Math.round(accuracy)}%</p>
    `;
    
    // Scroll to results
    document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
}

function resetUpload() {
    // Clear preview and results
    document.getElementById('previewContainer').classList.add('hidden');
    document.getElementById('resultsContainer').classList.add('hidden');
    document.getElementById('uploadArea').classList.remove('hidden');
    
    // Clear file input
    document.getElementById('imageInput').value = '';
    
    // Clear stored data
    window.uploadedFile = null;
    window.uploadedImageData = null;
    
    showNotification('Ready for new upload', 'info');
}

function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        if (show) {
            spinner.classList.remove('hidden');
        } else {
            spinner.classList.add('hidden');
        }
    }
}

// Feedback item styling
const feedbackStyle = document.createElement('style');
feedbackStyle.textContent = `
    .feedback-item {
        background: rgba(99, 102, 241, 0.1);
        border-left: 4px solid var(--primary-color);
        padding: 12px;
        margin: 10px 0;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .feedback-item i {
        color: var(--primary-color);
        font-size: 1.2em;
    }
`;
document.head.appendChild(feedbackStyle);
