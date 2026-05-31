# 🎓 User Guide - Features & Usage

## Table of Contents
1. [Getting Started](#getting-started)
2. [Main Features](#main-features)
3. [Yoga Poses](#yoga-poses)
4. [Accuracy System](#accuracy-system)
5. [Real-time Feedback](#real-time-feedback)
6. [Session Tracking](#session-tracking)
7. [Tips & Best Practices](#tips--best-practices)
8. [Keyboard Shortcuts](#keyboard-shortcuts)

---

## Getting Started

### Initial Setup
1. **Install Application**: Follow [INSTALLATION.md](INSTALLATION.md)
2. **Run Application**: Execute `python app.py`
3. **Open Browser**: Navigate to `http://localhost:5000`
4. **Grant Permissions**: Allow camera access when browser prompts
5. **You're Ready**: Start selecting poses!

### First Yoga Session
1. Click **"Start Evaluation"** button
2. **Select a Pose** from dropdown (e.g., "Mountain Pose")
3. **Prepare**: Position yourself in front of screen
4. **Click "Start"** to begin session
5. **Follow Feedback**: Adjust your posture based on real-time comments
6. **Click "Stop"** when finished

---

## Main Features

### 1. 🎥 Live Camera Feed
- **Location**: Left side of evaluation screen
- **Features**:
  - Real-time pose skeleton overlay
  - Angle measurements displayed
  - Live feedback status
  - Green checkmarks for correct joints

**Tips:**
- Ensure entire body is visible
- Keep 2-3 meters distance
- Use good lighting
- Wear form-fitting clothes for better detection

### 2. 📊 Accuracy Display
- **Location**: Large circle in analysis cards
- **Shows**: 0-100% accuracy score
- **Colors**:
  - 🟢 Green (80%+): Excellent form
  - 🟡 Orange (60-79%): Good, needs adjustment
  - 🔴 Red (0-59%): Significant correction needed

**Understanding Score:**
- Accuracy is based on angle measurements
- All key joints must be near ideal angles
- Extra 1° error decreases score ~2%
- Perfect alignment = 100%

### 3. 💬 Real-Time Feedback Panel
- **Shows**: 5 highest-priority suggestions
- **Updates**: Every frame during session
- **Examples**:
  - "Straighten your back"
  - "Raise your left shoulder"
  - "Bend knee to 90 degrees"
  - "Keep chest open"

**How to Use:**
- Read feedback carefully
- Adjust posture based on comments
- Watch accuracy increase as you improve
- Multiple feedback items = multiple issues

### 4. 📐 Angle Details
- **Shows**: Current vs. ideal angles for each joint
- **Format**: `Joint Name: Current° (Accuracy%)`
- **Colored Bars**:
  - Green border = Good angle
  - Orange border = Acceptable
  - Red border = Needs adjustment

**Interpretation:**
- Lower angle difference = Higher accuracy
- Check angles with feedback items
- Focus on red/orange angles first

### 5. ⏱️ Session Timer
- **Automatically starts**: When you click "Start"
- **Format**: MM:SS (minutes:seconds)
- **Shows**: Elapsed time for current session
- **Saved**: In history after session ends

**Tracking:**
- Track how long you hold poses
- Build endurance over time
- Compare session durations

---

## Yoga Poses

### 🏔️ Mountain Pose
**Difficulty**: Beginner ⭐

**Description**: Stand upright with feet together, arms at sides, body aligned.

**Key Points**:
- Feet hip-width apart (or together)
- Knees straight but not locked
- Spine neutral and tall
- Shoulders relaxed backward
- Weight evenly distributed

**Ideal Angles**:
- Knees: 180° (straight)
- Hips: 180° (neutral)
- Shoulders: 180° (level)

**Benefits**:
- Improves posture awareness
- Grounds your body
- Foundation for other poses
- Enhances body control

**Tips**:
- Press feet firmly into ground
- Engage core lightly
- Don't collapse forward in hips
- Maintain neutral spine throughout

---

### 🌳 Tree Pose
**Difficulty**: Intermediate ⭐⭐

**Description**: Stand on one leg with opposite foot placed on inner thigh.

**Key Points**:
- Stand firmly on one leg
- Lift other foot to inner thigh
- Hip opens to the side
- Hands at chest (prayer position) or overhead
- Focus eyes on fixed point

**Ideal Angles**:
- Standing knee: 180° (straight)
- Lifted knee: 45° (bent inward)
- Hips: 180° (level)
- Shoulders: 45° (open)

**Benefits**:
- Improves balance
- Strengthens standing leg
- Opens hips
- Enhances focus

**Common Mistakes**:
- Leaning body forward
- Letting lifted hip drop
- Standing foot turns outward
- Locked knee on standing leg

**Tips**:
- Pick a focal point at eye level
- Keep standing foot pressed down
- Don't push lifted foot too high initially
- Practice this first before advanced poses

---

### ⚔️ Warrior Pose
**Difficulty**: Intermediate ⭐⭐

**Description**: Stand with wide stance, bend front knee, extend arms.

**Key Points**:
- Front foot points forward
- Back foot at 45° angle
- Front knee bent at 90°
- Back leg straight and strong
- Torso upright and square
- Arms extended overhead

**Ideal Angles**:
- Front knee: 90° (right angle)
- Back knee: 160° (nearly straight)
- Front hip: 90° (open)
- Back hip: 90° (open)
- Shoulders: 90° (extended)

**Benefits**:
- Builds leg strength
- Improves balance
- Opens hips
- Increases stamina

**Common Mistakes**:
- Front knee rolling inward
- Front knee extending past ankle
- Leaning forward
- Back foot pointing wrong direction
- Shoulders not squared forward

**Tips**:
- Ensure front knee aligns with ankle
- Push back heel into ground
- Keep hips facing forward
- Build strength gradually
- This is a powerful strength-building pose

---

### ✋ T Pose
**Difficulty**: Beginner ⭐

**Description**: Stand upright with arms extended to sides at shoulder height.

**Key Points**:
- Feet hip-width apart
- Both legs straight
- Arms extended fully to sides
- Shoulders relaxed
- Head facing forward
- Body forms T shape

**Ideal Angles**:
- Knees: 180° (straight)
- Elbows: 180° (fully extended)
- Shoulders: 90° (perpendicular to body)
- Hips: 180° (neutral)

**Benefits**:
- Improves shoulder alignment
- Builds shoulder stability
- Checks posture symmetry
- Simple balance check

**Common Mistakes**:
- Arms drooping downward
- Uneven arm height
- Shoulders hunched up
- Slouching in spine
- Legs bending

**Tips**:
- Keep arms exactly at shoulder height
- Engage shoulders gently
- Make a perfect T shape with your body
- Good baseline pose to practice frequently

---

## Accuracy System

### How Accuracy is Calculated

1. **Angle Measurement**
   - System measures angles between joints
   - Compares current angles to ideal yoga angles
   - Calculates difference in degrees

2. **Accuracy Formula**
   ```
   If angle difference ≤ tolerance:
       Accuracy = 100%
   Else:
       Accuracy = 100% - (difference - tolerance) × 2%
   ```

3. **Overall Accuracy**
   - Averages accuracy of all key joints
   - Each joint weighted equally
   - Returns average percentage

4. **Pose Correctness**
   - Pose is "CORRECT" if overall accuracy ≥ 75%
   - Pose is "INCORRECT" if accuracy < 75%
   - Feedback adjusts based on lowest-accuracy joints

### Accuracy Zones

| Accuracy | Status | Color | Meaning |
|----------|--------|-------|---------|
| 90-100% | Perfect | 🟢 Green | Ideal form, minimal adjustments |
| 80-89% | Excellent | 🟢 Green | Great form, very close to ideal |
| 70-79% | Good | 🟡 Orange | Acceptable, can improve |
| 60-69% | Fair | 🟡 Orange | Needs work, multiple issues |
| 0-59% | Poor | 🔴 Red | Significant form problems |

---

## Real-time Feedback

### Types of Feedback

**Joint-Specific**:
- "Straighten your right knee"
- "Raise your left shoulder"
- "Bend your right elbow more"
- "Lower your hips"

**General**:
- "Keep your back straight"
- "Engage your core"
- "Ground both feet"
- "Relax your shoulders"

**Balance**:
- "Distribute weight evenly"
- "Focus on one point"
- "Stabilize your stance"

### How to Use Feedback

1. **Read** the suggestion carefully
2. **Identify** which body part needs adjustment
3. **Adjust** slowly and deliberately
4. **Watch** the accuracy score increase
5. **Repeat** until reaching 75%+ accuracy

### Feedback Priority

Feedback items are prioritized by:
1. Lowest accuracy angles first
2. Most critical joints for pose
3. Most impactful adjustments
4. Safety concerns

---

## Session Tracking

### Starting a Session

```
1. Click "Start" button
2. Timer begins counting
3. Camera feed becomes active
4. Real-time feedback begins
5. Angle monitoring starts
```

### During Session

- Watch accuracy score update
- Read and follow feedback
- Adjust posture continuously
- Hold pose steadily
- Breathe normally

### Ending a Session

```
1. Click "Stop" button
2. Session data saved
3. Statistics updated
4. History recorded
5. Ready for new session
```

### Session Information Saved

- **Timestamp**: When session occurred
- **Duration**: Total time held
- **Accuracy**: Final accuracy percentage
- **Pose Type**: Which yoga pose
- **Frames**: Number processed

### Viewing History

1. **Location**: Statistics section (bottom of page)
2. **Shows**: Last 10 sessions
3. **Displays**:
   - Session date/time
   - Duration
   - Accuracy score
   - Pose type

### Statistics Calculated

- **Total Sessions**: Number of sessions recorded
- **Total Time**: Combined duration of all sessions
- **Best Accuracy**: Highest accuracy achieved
- **Success Rate**: % of sessions with 75%+ accuracy
- **Trends**: Progress over time

---

## Tips & Best Practices

### 🎥 Camera Setup

**Lighting**:
- ✅ Natural daylight (best)
- ✅ Bright room lighting
- ❌ Backlighting (silhouette)
- ❌ Dim or dark areas
- ❌ Flickering lights

**Distance**:
- ✅ 2-3 meters from camera
- ❌ Too close (crops body)
- ❌ Too far (can't detect)
- ❌ Partially visible

**Background**:
- ✅ Plain, neutral backgrounds
- ✅ Solid walls
- ✅ Minimal clutter
- ❌ Complex patterns
- ❌ Moving objects behind

**Positioning**:
- ✅ Full body in frame
- ✅ Arms away from body
- ✅ Legs fully visible
- ✅ Head included
- ❌ Cropped limbs
- ❌ Side positioning

### 🧘 Yoga Practice

**Warm-up**:
- Start with Mountain Pose
- Practice for 30 seconds
- Get comfortable with system
- Relax and breathe

**Progression**:
1. Master Mountain Pose first
2. Move to T Pose (similar)
3. Try Tree Pose (balance)
4. Challenge yourself with Warrior Pose

**Duration**:
- Start: 30-60 second sessions
- Build: 2-3 minutes per pose
- Advanced: 5+ minutes
- Rest between poses

**Goals**:
- First session: Try to get 60%+ accuracy
- Week 1: Achieve 75%+ consistency
- Week 2: Target 85%+ accuracy
- Week 3+: Perfect form (95%+)

**Frequency**:
- 3-4 sessions per week: Good
- Daily practice: Excellent
- Multiple poses per day: Advanced

### 🎯 Form Improvements

**Focus Areas**:
1. **Alignment**: Read feedback, adjust slowly
2. **Stability**: Hold poses steadily
3. **Balance**: Stay centered and grounded
4. **Breathing**: Continue normal breathing
5. **Consistency**: Build muscle memory

**Technique**:
- Start with easier poses
- Master basics before advanced
- Build strength gradually
- Be patient with progress
- Celebrate small improvements

### 📊 Tracking Progress

**Weekly**:
- Record sessions 3-4 times
- Track accuracy improvements
- Note problem areas
- Celebrate achievements

**Monthly**:
- Review accuracy trends
- Identify improved poses
- Set new goals
- Challenge yourself

**Tracking Tips**:
- Take notes on feedback received
- Photograph your form
- Compare sessions side-by-side
- Share progress with friends

### ⚠️ Safety

**General**:
- Stop if experiencing pain
- Don't overextend joints
- Warm up before sessions
- Cool down after sessions
- Consult doctor if injured

**Form**:
- Follow feedback carefully
- Don't force alignments
- Listen to your body
- Progress gradually
- Prevent injuries

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `S` | Start session |
| `E` | Stop session |
| `R` | Reset timer |
| `T` | Toggle dark/light theme |
| `Ctrl+R` | Refresh page |
| `F11` | Fullscreen mode |
| `Esc` | Exit fullscreen |

---

## Theme Customization

### Dark Theme
- Click moon icon (☀️) in top-right
- Better for low-light environments
- Easier on eyes for extended use
- Reduces blue light before sleep

### Light Theme
- Click moon icon (🌙) in top-right
- Traditional appearance
- Better visibility in bright rooms
- Professional look

### Theme Persistence
- Theme choice is saved automatically
- Remembered across sessions
- Synced across browser tabs

---

## Troubleshooting During Use

### Issue: Webcam shows, but no pose detected
- **Cause**: Insufficient lighting
- **Fix**: Move to brighter location
- **Or**: Zoom camera out more

### Issue: Pose detected but inaccurate angles
- **Cause**: Body parts not fully visible
- **Fix**: Ensure entire body in frame
- **Or**: Adjust camera position

### Issue: Accuracy stuck at low percentage
- **Cause**: Not holding target angle
- **Fix**: Read feedback items carefully
- **Or**: Adjust posture more deliberately

### Issue: Feedback doesn't match expected pose
- **Cause**: Pose selection mismatch
- **Fix**: Verify correct pose selected
- **Or**: Change to intended pose

### Issue: Session not saving to history
- **Cause**: Browser storage disabled
- **Fix**: Enable cookies/storage
- **Or**: Use private browsing off

---

## Advanced Tips

### Strength Building
- Hold poses longer (30 seconds+)
- Multiple sessions daily
- Focus on difficult angles
- Build endurance gradually

### Balance Improvement
- Try Tree Pose daily
- Start near wall/support
- Gradually reduce support
- Make eye focus stronger

### Posture Correction
- Practice Mountain Pose daily
- Be mindful of feedback
- Correct bad habits
- Build muscle memory

### Yoga Journey
- Practice 4-6 weeks minimum
- See significant improvements
- Aim for 95%+ accuracy
- Help others improve forms

---

## Getting Most Value

### Daily Routine
1. Warm up (30 seconds)
2. Choose pose (2 minutes)
3. Practice (2-3 minutes)
4. Review feedback (1 minute)
5. Rest and reflect (1 minute)
- **Total**: ~10 minutes, 5 days/week

### Weekly Challenge
- Master easier pose to 90%+
- Progress to harder pose
- Record previous week's stats
- Set accuracy goals

### Monthly Goals
- Practice 12+ sessions
- Achieve 85%+ best accuracy
- Hold poses 5+ minutes
- Help someone else practice

---

## Support & Feedback

Having issues? Check:
1. [QUICKSTART.md](QUICKSTART.md) - Quick answers
2. [README.md](README.md) - Detailed info
3. [INSTALLATION.md](INSTALLATION.md) - Setup help
4. This guide - Feature details

---

🧘 **Happy Practicing! Keep improving your form!** 🧘
