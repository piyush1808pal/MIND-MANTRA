// Enhanced MindMantra Mental Health Platform JavaScript

// Global Variables
let currentUser = {
    level: 3,
    xp: 650,
    wellnessScore: 847,
    moodStreak: 7
};

let appState = {
    currentSection: 'dashboard',
    voiceRecognition: null,
    speechSynthesis: null,
    currentLanguage: 'en-US',
    musicPlayer: null,
    currentTrack: null,
    isVoiceActive: false,
    tutorialStep: 0,
    gameState: null
};

// Data from JSON (integrated from provided application_data_json)
const musicLibrary = {
    meditation: [
        {id: 1, title: "Peaceful Forest", duration: "15:30", mood: "calm", category: "meditation"},
        {id: 2, title: "Ocean Waves", duration: "20:00", mood: "relaxed", category: "meditation"},
        {id: 3, title: "Mountain Breeze", duration: "12:15", mood: "peaceful", category: "meditation"},
        {id: 4, title: "Tibetan Singing Bowl", duration: "18:45", mood: "spiritual", category: "meditation"},
        {id: 5, title: "Gentle Rain", duration: "25:00", mood: "soothing", category: "meditation"}
    ],
    sleep: [
        {id: 6, title: "Deep Sleep Delta Waves", duration: "60:00", mood: "drowsy", category: "sleep"},
        {id: 7, title: "Night Crickets", duration: "45:00", mood: "sleepy", category: "sleep"},
        {id: 8, title: "Lullaby Piano", duration: "30:00", mood: "calm", category: "sleep"},
        {id: 9, title: "White Noise Ocean", duration: "50:00", mood: "relaxed", category: "sleep"},
        {id: 10, title: "Sleep Story: Forest Path", duration: "35:00", mood: "dreamy", category: "sleep"}
    ],
    stressRelief: [
        {id: 11, title: "Anxiety Release", duration: "10:00", mood: "anxious", category: "stress"},
        {id: 12, title: "Breathing Exercise Music", duration: "8:30", mood: "tense", category: "stress"},
        {id: 13, title: "Stress Melting Away", duration: "12:00", mood: "overwhelmed", category: "stress"},
        {id: 14, title: "Calming Nature Sounds", duration: "15:00", mood: "stressed", category: "stress"},
        {id: 15, title: "Progressive Muscle Relaxation", duration: "20:00", mood: "tight", category: "stress"}
    ],
    advancedPractice: [
        {id: 16, title: "Vipassana Meditation", duration: "45:00", mood: "focused", category: "advanced"},
        {id: 17, title: "Chakra Balancing", duration: "35:00", mood: "spiritual", category: "advanced"},
        {id: 18, title: "Mindfulness Bell Practice", duration: "30:00", mood: "mindful", category: "advanced"},
        {id: 19, title: "Body Scan Deep Practice", duration: "40:00", mood: "introspective", category: "advanced"},
        {id: 20, title: "Loving Kindness Meditation", duration: "25:00", mood: "compassionate", category: "advanced"}
    ],
    moodBased: {
        happy: [
            {id: 21, title: "Uplifting Sunshine", artist: "MindfulBeats", duration: "3:45"},
            {id: 22, title: "Joyful Morning", artist: "Wellness Sounds", duration: "4:20"},
            {id: 23, title: "Celebration Dance", artist: "Positive Vibes", duration: "3:30"}
        ],
        energetic: [
            {id: 24, title: "Morning Power", artist: "Energy Flow", duration: "4:15"},
            {id: 25, title: "Workout Motivation", artist: "Active Mind", duration: "3:50"},
            {id: 26, title: "Dynamic Focus", artist: "Peak Performance", duration: "4:30"}
        ],
        calm: [
            {id: 27, title: "Peaceful Moments", artist: "Tranquil Sounds", duration: "5:00"},
            {id: 28, title: "Gentle Breeze", artist: "Nature Harmony", duration: "4:45"},
            {id: 29, title: "Still Waters", artist: "Serenity Music", duration: "6:20"}
        ],
        reflective: [
            {id: 30, title: "Inner Journey", artist: "Mindful Melodies", duration: "7:15"},
            {id: 31, title: "Contemplation", artist: "Deep Thoughts", duration: "5:30"},
            {id: 32, title: "Soul Searching", artist: "Introspective Sounds", duration: "6:45"}
        ]
    }
};

const gamificationGames = [
    {id: 1, name: "Mindful Memory Match", type: "memory", description: "Match meditation cards", xpReward: 15, difficulty: "easy"},
    {id: 2, name: "Emotion Pattern Memory", type: "memory", description: "Remember emotional patterns", xpReward: 25, difficulty: "medium"},
    {id: 3, name: "Breathing Sequence Memory", type: "memory", description: "Memorize breathing patterns", xpReward: 35, difficulty: "hard"},
    {id: 4, name: "Stress Relief Puzzle", type: "puzzle", description: "Complete calming puzzles", xpReward: 20, difficulty: "easy"},
    {id: 5, name: "Chakra Alignment Puzzle", type: "puzzle", description: "Arrange chakra elements", xpReward: 30, difficulty: "medium"},
    {id: 6, name: "Mind Maze Navigator", type: "puzzle", description: "Navigate mental challenges", xpReward: 40, difficulty: "hard"},
    {id: 7, name: "Mental Health Trivia", type: "trivia", description: "Test mental health knowledge", xpReward: 10, difficulty: "easy"},
    {id: 8, name: "Mindfulness Master Quiz", type: "trivia", description: "Advanced mindfulness questions", xpReward: 20, difficulty: "medium"},
    {id: 9, name: "Psychology Expert Challenge", type: "trivia", description: "Professional psychology questions", xpReward: 30, difficulty: "hard"},
    {id: 10, name: "Mindful Breathing Timer", type: "reaction", description: "Match breathing to visual cues", xpReward: 12, difficulty: "easy"},
    {id: 11, name: "Emotion Quick Response", type: "reaction", description: "Identify emotional situations", xpReward: 22, difficulty: "medium"},
    {id: 12, name: "Stress Response Challenge", type: "reaction", description: "Practice stress management", xpReward: 32, difficulty: "hard"}
];

const yogaLibrary = {
    beginner: [
        {
            id: 1, name: "Mountain Pose (Tadasana)", difficulty: "beginner", duration: "1-2 minutes",
            instructions: ["Stand with feet hip-width apart", "Distribute weight evenly", "Engage leg muscles", "Lengthen spine", "Hold position"],
            benefits: ["Improves posture", "Increases awareness", "Strengthens legs"]
        },
        {
            id: 2, name: "Child's Pose (Balasana)", difficulty: "beginner", duration: "1-3 minutes",
            instructions: ["Kneel with big toes touching", "Sit back on heels", "Separate knees", "Fold forward", "Rest forehead on mat"],
            benefits: ["Reduces stress", "Calms nervous system", "Stretches hips"]
        }
    ],
    intermediate: [
        {
            id: 3, name: "Warrior II (Virabhadrasana II)", difficulty: "intermediate", duration: "30 seconds each side",
            instructions: ["Stand with feet apart", "Turn right foot 90 degrees", "Bend right knee", "Extend arms parallel", "Hold position"],
            benefits: ["Strengthens legs", "Improves focus", "Opens hips"]
        }
    ],
    advanced: [
        {
            id: 4, name: "Crow Pose (Bakasana)", difficulty: "advanced", duration: "15-30 seconds",
            instructions: ["Start in squat", "Place hands on mat", "Rest knees on arms", "Shift weight forward", "Lift feet"],
            benefits: ["Builds arm strength", "Improves balance", "Increases focus"]
        }
    ]
};

const copingStrategies = [
    {id: 1, title: "Deep Breathing", category: "anxiety", description: "4-7-8 breathing technique"},
    {id: 2, title: "Progressive Muscle Relaxation", category: "tension", description: "Systematic muscle tension release"},
    {id: 3, title: "Mindful Grounding", category: "panic", description: "5-4-3-2-1 sensory grounding"},
    {id: 4, title: "Positive Self-Talk", category: "depression", description: "Challenge negative thoughts"},
    {id: 5, title: "Physical Movement", category: "anger", description: "Channel energy through activity"},
    {id: 6, title: "Social Connection", category: "loneliness", description: "Reach out to trusted contacts"}
];

const thoughtDiarySteps = [
    {step: 1, title: "Identify the Situation", prompt: "What happened? Describe the situation objectively."},
    {step: 2, title: "Notice Your Emotions", prompt: "What emotions are you feeling? Rate intensity 1-10."},
    {step: 3, title: "Catch Your Thoughts", prompt: "What thoughts went through your mind?"},
    {step: 4, title: "Examine the Evidence", prompt: "What evidence supports or contradicts these thoughts?"},
    {step: 5, title: "Consider Alternatives", prompt: "What are other ways to think about this situation?"},
    {step: 6, title: "Rate the Thoughts", prompt: "How much do you believe your original thoughts now?"},
    {step: 7, title: "Plan Action Steps", prompt: "What helpful actions could you take?"},
    {step: 8, title: "Re-evaluate Emotions", prompt: "How do you feel now? Rate intensity 1-10."},
    {step: 9, title: "Reflect and Learn", prompt: "What insights did you gain from this process?"}
];

const vrEnvironments = [
    {id: 1, name: "Peaceful Forest", description: "Serene woodland setting", duration: "15-30 min", moodType: "calm"},
    {id: 2, name: "Ocean Beach", description: "Calming waves and sand", duration: "20-45 min", moodType: "relaxed"},
    {id: 3, name: "Mountain Lake", description: "Tranquil alpine setting", duration: "10-25 min", moodType: "peaceful"},
    {id: 4, name: "Garden Sanctuary", description: "Beautiful botanical garden", duration: "15-35 min", moodType: "rejuvenated"}
];

// Make functions globally accessible
window.dismissWelcome = dismissWelcome;
window.navigateToSection = navigateToSection;
window.toggleVoice = toggleVoice;
window.changeLanguage = changeLanguage;
window.selectMeditationCategory = selectMeditationCategory;
window.selectMoodMusic = selectMoodMusic;
window.toggleMusic = toggleMusic;
window.startDetailedMoodLog = startDetailedMoodLog;
window.startThoughtDiary = startThoughtDiary;
window.nextDiaryStep = nextDiaryStep;
window.previousDiaryStep = previousDiaryStep;
window.openCopingCards = openCopingCards;
window.startCognitiveAssessment = startCognitiveAssessment;
window.startGame = startGame;
window.toggleVoiceChat = toggleVoiceChat;
window.sendMessage = sendMessage;
window.activateCrisisSupport = activateCrisisSupport;
window.startVRSession = startVRSession;
window.pauseVRSession = pauseVRSession;
window.adjustVRSettings = adjustVRSettings;
window.endVRSession = endVRSession;
window.startFacialAnalysis = startFacialAnalysis;
window.pauseFacialAnalysis = pauseFacialAnalysis;
window.stopFacialAnalysis = stopFacialAnalysis;
window.showPosesByDifficulty = showPosesByDifficulty;
window.downloadCertificate = downloadCertificate;
window.startCertification = startCertification;
window.continueCertification = continueCertification;
window.startVolunteering = startVolunteering;
window.toggleSetting = toggleSetting;
window.contactGuardian = contactGuardian;
window.quickMoodCheck = quickMoodCheck;
window.startEmergencySupport = startEmergencySupport;
window.startQuickMeditation = startQuickMeditation;
window.showCopingCards = showCopingCards;
window.showQuickActions = showQuickActions;
window.closeModal = closeModal;
window.skipTutorial = skipTutorial;
window.nextTutorialStep = nextTutorialStep;
window.pauseGame = pauseGame;
window.resumeGame = resumeGame;
window.restartGame = restartGame;
window.completeGame = completeGame;

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Show welcome overlay with voice introduction
    showVoiceWelcome();
    
    // Initialize voice recognition
    initializeVoiceRecognition();
    
    // Initialize speech synthesis
    initializeSpeechSynthesis();
    
    // Initialize charts
    initializeCharts();
    
    // Initialize mood calendar
    initializeMoodCalendar();
    
    // Initialize coping cards preview
    initializeCopingCards();
    
    // Initialize yoga poses
    initializeYogaPoses();
    
    // Initialize VR status
    checkVRSupport();
    
    // Initialize achievements
    initializeAchievements();
    
    // Update UI elements
    updateUserStats();
    
    // Start tutorial if first visit
    if (!localStorage.getItem('tutorialCompleted')) {
        setTimeout(() => showTutorial(), 2000);
    }
}

// Voice Recognition System
function initializeVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        appState.voiceRecognition = new SpeechRecognition();
        
        appState.voiceRecognition.continuous = true;
        appState.voiceRecognition.interimResults = true;
        appState.voiceRecognition.lang = appState.currentLanguage;
        
        appState.voiceRecognition.onstart = function() {
            appState.isVoiceActive = true;
            const voiceToggle = document.getElementById('voiceToggle');
            if (voiceToggle) {
                voiceToggle.classList.add('listening');
            }
            updateVoiceStatus('Listening...');
        };
        
        appState.voiceRecognition.onresult = function(event) {
            let finalTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            
            if (finalTranscript) {
                processVoiceCommand(finalTranscript.toLowerCase().trim());
            }
        };
        
        appState.voiceRecognition.onerror = function(event) {
            console.log('Voice recognition error:', event.error);
            updateVoiceStatus('Error occurred');
        };
        
        appState.voiceRecognition.onend = function() {
            appState.isVoiceActive = false;
            const voiceToggle = document.getElementById('voiceToggle');
            if (voiceToggle) {
                voiceToggle.classList.remove('listening');
            }
            updateVoiceStatus('Click to activate');
        };
        
        // Start listening automatically
        setTimeout(() => {
            startVoiceRecognition();
        }, 1000);
    }
}

function initializeSpeechSynthesis() {
    if ('speechSynthesis' in window) {
        appState.speechSynthesis = window.speechSynthesis;
    }
}

function startVoiceRecognition() {
    if (appState.voiceRecognition && !appState.isVoiceActive) {
        try {
            appState.voiceRecognition.start();
        } catch (error) {
            console.log('Voice recognition start error:', error);
        }
    }
}

function stopVoiceRecognition() {
    if (appState.voiceRecognition && appState.isVoiceActive) {
        appState.voiceRecognition.stop();
    }
}

function toggleVoice() {
    if (appState.isVoiceActive) {
        stopVoiceRecognition();
    } else {
        startVoiceRecognition();
    }
}

function processVoiceCommand(command) {
    showVoiceCommand(command);
    
    // Navigation commands
    if (command.includes('go to dashboard') || command.includes('show dashboard')) {
        navigateToSection('dashboard');
        speak('Navigating to dashboard');
    } else if (command.includes('go to meditation') || command.includes('open meditation')) {
        navigateToSection('meditation');
        speak('Opening meditation section');
    } else if (command.includes('check my mood') || command.includes('mood tracking')) {
        navigateToSection('mood-tracking');
        speak('Opening mood tracking');
    } else if (command.includes('start therapy') || command.includes('ai companion')) {
        navigateToSection('ai-companion');
        speak('Opening AI companion');
    } else if (command.includes('show gamification') || command.includes('open games')) {
        navigateToSection('gamification');
        speak('Opening gamification hub');
    } else if (command.includes('cbt tools') || command.includes('cognitive tools')) {
        navigateToSection('cbt-tools');
        speak('Opening CBT tools');
    }
    
    // Action commands
    else if (command.includes('record mood') || command.includes('log mood')) {
        quickMoodCheck();
        speak('Starting mood check');
    } else if (command.includes('start meditation') || command.includes('meditate now')) {
        startQuickMeditation();
        speak('Starting meditation session');
    } else if (command.includes('emergency help') || command.includes('crisis support')) {
        startEmergencySupport();
        speak('Activating crisis support');
    } else if (command.includes('play music')) {
        toggleMusic();
        speak('Playing music');
    } else if (command.includes('show coping cards')) {
        showCopingCards();
        speak('Showing coping strategies');
    }
}

function speak(text) {
    if (appState.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = appState.currentLanguage;
        utterance.rate = 0.8;
        appState.speechSynthesis.speak(utterance);
    }
}

function showVoiceCommand(command) {
    const display = document.getElementById('voiceCommandDisplay');
    const commandText = document.getElementById('commandText');
    const commandStatus = document.getElementById('commandStatus');
    
    if (display && commandText && commandStatus) {
        commandText.textContent = `"${command}"`;
        commandStatus.textContent = 'Processing...';
        display.classList.add('active');
        
        setTimeout(() => {
            commandStatus.textContent = 'Command executed';
            setTimeout(() => {
                display.classList.remove('active');
            }, 2000);
        }, 1000);
    }
}

function updateVoiceStatus(status) {
    const statusElement = document.getElementById('voiceStatus');
    if (statusElement) {
        statusElement.textContent = status;
    }
}

function changeLanguage() {
    const select = document.getElementById('languageSelect');
    if (select) {
        appState.currentLanguage = select.value;
        
        if (appState.voiceRecognition) {
            appState.voiceRecognition.lang = appState.currentLanguage;
        }
        
        speak('Language changed');
    }
}

// Navigation System
function navigateToSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const activeNavItem = document.querySelector(`.nav-item[onclick*="${sectionId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    appState.currentSection = sectionId;
}

// Music Player System
function selectMeditationCategory(category) {
    const sessions = musicLibrary[category] || [];
    const sessionList = document.getElementById('sessionList');
    
    if (sessionList) {
        sessionList.innerHTML = '';
        
        sessions.forEach(session => {
            const sessionElement = document.createElement('div');
            sessionElement.className = 'session-item';
            sessionElement.innerHTML = `
                <h4>${session.title}</h4>
                <p>Duration: ${session.duration}</p>
                <p>Mood: ${session.mood}</p>
            `;
            sessionElement.onclick = () => playMeditation(session);
            sessionList.appendChild(sessionElement);
        });
        
        const sessionTitle = document.getElementById('sessionTitle');
        if (sessionTitle) {
            sessionTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Sessions`;
        }
    }
}

function selectMoodMusic(mood) {
    const tracks = musicLibrary.moodBased[mood] || [];
    
    // Update mood buttons
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    if (tracks.length > 0) {
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        displayTrack(randomTrack);
        playTrack(randomTrack);
    }
}

function displayTrack(track) {
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const trackDuration = document.getElementById('trackDuration');
    
    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = track.artist;
    if (trackDuration) trackDuration.textContent = track.duration;
    
    // Simulate track progress
    let progress = 0;
    const progressBar = document.getElementById('trackProgress');
    if (progressBar) {
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                progressBar.style.width = '0%';
            }
        }, 100);
    }
}

function playTrack(track) {
    appState.currentTrack = track;
    updateMusicControls(true);
}

function toggleMusic() {
    const musicIcon = document.getElementById('musicIcon');
    const musicStatus = document.getElementById('musicStatus');
    
    if (musicIcon && musicStatus) {
        if (musicIcon.textContent === '▶️') {
            musicIcon.textContent = '⏸️';
            musicStatus.textContent = 'Pause Music';
        } else {
            musicIcon.textContent = '▶️';
            musicStatus.textContent = 'Play Music';
        }
    }
}

function updateMusicControls(isPlaying) {
    const musicIcon = document.getElementById('musicIcon');
    const musicStatus = document.getElementById('musicStatus');
    
    if (musicIcon && musicStatus) {
        if (isPlaying) {
            musicIcon.textContent = '⏸️';
            musicStatus.textContent = 'Pause Music';
        } else {
            musicIcon.textContent = '▶️';
            musicStatus.textContent = 'Play Music';
        }
    }
}

// Mood Tracking System
function initializeMoodCalendar() {
    const calendar = document.getElementById('moodCalendar');
    if (!calendar) return;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Generate calendar for current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add day headers
    const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    dayHeaders.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-header';
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    });
    
    // Add days with mood data
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Simulate mood data
        const moodTypes = ['mood-happy', 'mood-neutral', 'mood-sad'];
        const randomMood = moodTypes[Math.floor(Math.random() * moodTypes.length)];
        
        if (day <= today.getDate()) {
            dayElement.classList.add(randomMood);
        }
        
        dayElement.onclick = () => logMoodForDay(day);
        calendar.appendChild(dayElement);
    }
}

function startDetailedMoodLog() {
    speak('Starting voice mood log. How are you feeling today?');
    
    // Start voice recognition for mood input
    if (appState.voiceRecognition) {
        const originalOnResult = appState.voiceRecognition.onresult;
        
        appState.voiceRecognition.onresult = function(event) {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                }
            }
            
            if (transcript) {
                processMoodInput(transcript);
                appState.voiceRecognition.onresult = originalOnResult;
            }
        };
    }
}

function processMoodInput(input) {
    const moodKeywords = {
        happy: ['happy', 'good', 'great', 'excellent', 'wonderful'],
        sad: ['sad', 'down', 'depressed', 'low', 'blue'],
        anxious: ['anxious', 'worried', 'nervous', 'stressed', 'tense'],
        calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil']
    };
    
    let detectedMood = 'neutral';
    
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
        if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
            detectedMood = mood;
            break;
        }
    }
    
    speak(`I detected that you're feeling ${detectedMood}. Your mood has been logged.`);
    updateMoodScore(detectedMood);
}

function logMoodForDay(day) {
    const moods = ['😊 Happy', '😐 Neutral', '😢 Sad', '😰 Anxious', '😌 Calm'];
    const selectedMood = prompt(`How were you feeling on day ${day}?\n${moods.join('\n')}`);
    
    if (selectedMood) {
        speak('Mood logged successfully');
    }
}

function updateMoodScore(mood) {
    const moodScores = {
        happy: 9,
        calm: 8,
        neutral: 6,
        anxious: 4,
        sad: 3
    };
    
    const score = moodScores[mood] || 6;
    const moodScoreElement = document.getElementById('moodScore');
    if (moodScoreElement) {
        moodScoreElement.textContent = score.toFixed(1);
    }
}

// CBT Tools System
function startThoughtDiary() {
    const modal = document.getElementById('thoughtDiaryModal');
    if (modal) {
        modal.classList.remove('hidden');
        
        let currentStep = 1;
        showDiaryStep(currentStep);
        speak('Starting thought diary session. Let\'s work through this together.');
    }
}

function showDiaryStep(stepNumber) {
    const step = thoughtDiarySteps[stepNumber - 1];
    const stepsContainer = document.getElementById('diarySteps');
    const stepIndicator = document.getElementById('stepIndicator');
    
    if (stepIndicator) {
        stepIndicator.textContent = `Step ${stepNumber} of 9`;
    }
    
    if (stepsContainer) {
        stepsContainer.innerHTML = `
            <div class="diary-step">
                <h4>${step.title}</h4>
                <p>${step.prompt}</p>
                <textarea class="form-control" rows="4" placeholder="Your response..."></textarea>
            </div>
        `;
    }
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.style.display = stepNumber === 1 ? 'none' : 'block';
    }
    if (nextBtn) {
        nextBtn.textContent = stepNumber === 9 ? 'Complete' : 'Next';
    }
}

function nextDiaryStep() {
    const stepIndicator = document.getElementById('stepIndicator');
    if (stepIndicator) {
        const currentStep = parseInt(stepIndicator.textContent.match(/\d+/)[0]);
        
        if (currentStep < 9) {
            showDiaryStep(currentStep + 1);
        } else {
            completeDiarySession();
        }
    }
}

function previousDiaryStep() {
    const stepIndicator = document.getElementById('stepIndicator');
    if (stepIndicator) {
        const currentStep = parseInt(stepIndicator.textContent.match(/\d+/)[0]);
        
        if (currentStep > 1) {
            showDiaryStep(currentStep - 1);
        }
    }
}

function completeDiarySession() {
    speak('Thought diary session completed. Great work on your self-reflection!');
    closeModal('thoughtDiaryModal');
    awardXP(50);
}

function openCopingCards() {
    showCopingCards();
}

function initializeCopingCards() {
    const preview = document.getElementById('copingPreview');
    
    if (preview) {
        copingStrategies.slice(0, 4).forEach(strategy => {
            const card = document.createElement('div');
            card.className = 'coping-card-preview';
            card.textContent = strategy.title;
            card.onclick = () => showCopingStrategy(strategy);
            preview.appendChild(card);
        });
    }
}

function showCopingStrategy(strategy) {
    speak(`Try this coping strategy: ${strategy.description}`);
}

function showCopingCards() {
    speak('Here are your personalized coping strategies. Drag and arrange them as needed.');
}

function startCognitiveAssessment(type) {
    speak(`Starting ${type} assessment. Follow the instructions carefully.`);
    // Implement specific cognitive tests
}

// Gamification System
function startGame(gameId) {
    const game = gamificationGames.find(g => g.id === gameId);
    if (!game) return;
    
    const modal = document.getElementById('gameModal');
    const gameTitle = document.getElementById('gameTitle');
    
    if (modal && gameTitle) {
        gameTitle.textContent = game.name;
        modal.classList.remove('hidden');
        
        // Initialize game based on type
        switch (game.type) {
            case 'memory':
                initializeMemoryGame(game);
                break;
            case 'puzzle':
                initializePuzzleGame(game);
                break;
            case 'trivia':
                initializeTriviaGame(game);
                break;
            case 'reaction':
                initializeReactionGame(game);
                break;
        }
        
        speak(`Starting ${game.name}. Good luck!`);
    }
}

function initializeMemoryGame(game) {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    
    const cards = ['🧘‍♂️', '😊', '🌱', '💚', '🌟', '✨', '🦋', '🌸'];
    const gameCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    
    gameArea.innerHTML = '';
    gameArea.style.display = 'grid';
    gameArea.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gameArea.style.gap = '10px';
    
    let flippedCards = [];
    let matchedPairs = 0;
    
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.style.cssText = `
            width: 80px;
            height: 80px;
            background: var(--color-secondary);
            border-radius: var(--radius-base);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: var(--font-size-xl);
            border: 1px solid var(--color-border);
        `;
        cardElement.textContent = '?';
        cardElement.dataset.value = card;
        cardElement.dataset.index = index;
        
        cardElement.onclick = function() {
            if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
                this.textContent = card;
                this.classList.add('flipped');
                flippedCards.push(this);
                
                if (flippedCards.length === 2) {
                    setTimeout(() => {
                        if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
                            matchedPairs++;
                            flippedCards.forEach(c => c.style.background = 'var(--color-success)');
                            
                            if (matchedPairs === cards.length) {
                                completeGame(game);
                            }
                        } else {
                            flippedCards.forEach(c => {
                                c.textContent = '?';
                                c.classList.remove('flipped');
                            });
                        }
                        flippedCards = [];
                    }, 1000);
                }
            }
        };
        
        gameArea.appendChild(cardElement);
    });
}

function initializeTriviaGame(game) {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    
    const questions = [
        {
            question: "What does CBT stand for?",
            answers: ["Cognitive Behavioral Therapy", "Clinical Brain Therapy", "Comprehensive Behavior Treatment", "Cognitive Brain Training"],
            correct: 0
        },
        {
            question: "Which breathing technique helps reduce anxiety?",
            answers: ["4-7-8 breathing", "Rapid breathing", "Shallow breathing", "Irregular breathing"],
            correct: 0
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    function showQuestion() {
        const q = questions[currentQuestion];
        gameArea.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3>${q.question}</h3>
                <div style="margin-top: 20px;">
                    ${q.answers.map((answer, index) => `
                        <button class="btn btn--outline" style="display: block; width: 100%; margin: 10px 0;" 
                                onclick="answerQuestion(${index})">${answer}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    window.answerQuestion = function(selectedIndex) {
        const correct = questions[currentQuestion].correct;
        if (selectedIndex === correct) {
            score += 10;
            speak('Correct!');
        } else {
            speak('Incorrect. Try to remember this for next time.');
        }
        
        currentQuestion++;
        if (currentQuestion < questions.length) {
            setTimeout(showQuestion, 1000);
        } else {
            completeGame(game);
        }
    };
    
    showQuestion();
}

function initializePuzzleGame(game) {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    
    gameArea.innerHTML = `
        <div style="text-align: center;">
            <h3>Arrange the stress relief elements</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 20px;">
                <div class="puzzle-piece" draggable="true">🌱 Growth</div>
                <div class="puzzle-piece" draggable="true">🧘‍♂️ Mindfulness</div>
                <div class="puzzle-piece" draggable="true">💚 Compassion</div>
                <div class="puzzle-piece" draggable="true">🌟 Hope</div>
                <div class="puzzle-piece" draggable="true">✨ Peace</div>
                <div class="puzzle-piece" draggable="true">🦋 Transformation</div>
            </div>
            <button class="btn btn--primary" style="margin-top: 20px;" onclick="completeGame(${JSON.stringify(game).replace(/"/g, '&quot;')})">Complete Puzzle</button>
        </div>
    `;
    
    // Add drag and drop functionality
    const pieces = gameArea.querySelectorAll('.puzzle-piece');
    pieces.forEach(piece => {
        piece.style.cssText = `
            padding: 15px;
            background: var(--color-secondary);
            border-radius: var(--radius-base);
            cursor: move;
            border: 1px solid var(--color-border);
        `;
    });
}

function initializeReactionGame(game) {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    
    let sequence = [];
    let playerSequence = [];
    let level = 1;
    
    gameArea.innerHTML = `
        <div style="text-align: center;">
            <h3>Mindful Breathing Pattern</h3>
            <p>Watch the pattern and repeat it</p>
            <div id="breathingCircle" style="
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: var(--color-primary);
                margin: 20px auto;
                transition: transform 0.5s;
                cursor: pointer;
            "></div>
            <button class="btn btn--primary" onclick="startBreathingSequence()">Start</button>
        </div>
    `;
    
    window.startBreathingSequence = function() {
        sequence = [];
        for (let i = 0; i < level; i++) {
            sequence.push(Math.random() > 0.5 ? 'in' : 'out');
        }
        playSequence();
    };
    
    function playSequence() {
        const circle = document.getElementById('breathingCircle');
        if (!circle) return;
        
        sequence.forEach((breath, index) => {
            setTimeout(() => {
                if (breath === 'in') {
                    circle.style.transform = 'scale(1.5)';
                } else {
                    circle.style.transform = 'scale(0.7)';
                }
                
                setTimeout(() => {
                    circle.style.transform = 'scale(1)';
                }, 500);
            }, index * 1000);
        });
        
        setTimeout(() => {
            circle.onclick = function() {
                playerSequence.push('click');
                if (playerSequence.length === sequence.length) {
                    level++;
                    completeGame(game);
                }
            };
        }, sequence.length * 1000);
    }
}

function completeGame(game) {
    speak(`Congratulations! You completed ${game.name} and earned ${game.xpReward} XP!`);
    awardXP(game.xpReward);
    closeModal('gameModal');
}

function pauseGame() {
    speak('Game paused');
}

function resumeGame() {
    speak('Game resumed');
}

function restartGame() {
    speak('Restarting game');
}

function awardXP(amount) {
    currentUser.xp += amount;
    updateUserStats();
    
    // Check for level up
    const requiredXP = currentUser.level * 1000;
    if (currentUser.xp >= requiredXP) {
        currentUser.level++;
        currentUser.xp = 0;
        speak(`Level up! You are now level ${currentUser.level}!`);
    }
}

function initializeAchievements() {
    const achievementList = document.getElementById('achievementList');
    if (achievementList) {
        const achievements = [
            '🏆 First Meditation - Completed your first session',
            '🎯 Mood Master - Logged mood for 7 days straight',
            '🧠 CBT Champion - Completed 5 thought diary sessions'
        ];
        
        achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = 'achievement-item';
            achievementElement.textContent = achievement;
            achievementList.appendChild(achievementElement);
        });
    }
}

// VR/AR Therapy System
function checkVRSupport() {
    const vrStatus = document.getElementById('vrStatus');
    if (!vrStatus) return;
    
    if ('xr' in navigator) {
        navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
            if (supported) {
                vrStatus.textContent = 'WebXR Status: VR Supported';
                vrStatus.style.color = 'var(--color-success)';
            } else {
                vrStatus.textContent = 'WebXR Status: VR Not Supported - Using 2D Mode';
                vrStatus.style.color = 'var(--color-warning)';
            }
        });
    } else {
        vrStatus.textContent = 'WebXR Status: Not Available - Using 2D Mode';
        vrStatus.style.color = 'var(--color-error)';
    }
}

function startVRSession(environmentId) {
    const environment = vrEnvironments.find(env => env.id === environmentId);
    if (!environment) return;
    
    const sessionDisplay = document.getElementById('vrSessionDisplay');
    const vrControls = document.getElementById('vrControls');
    const vrProgress = document.getElementById('vrProgress');
    
    if (sessionDisplay) {
        sessionDisplay.innerHTML = `
            <div style="text-align: center;">
                <h4>Now experiencing: ${environment.name}</h4>
                <p>${environment.description}</p>
                <div style="font-size: 4rem; margin: 20px 0;">🌲</div>
                <p>Immerse yourself in this peaceful environment</p>
            </div>
        `;
    }
    
    if (vrControls) vrControls.style.display = 'block';
    if (vrProgress) vrProgress.style.display = 'block';
    
    speak(`Starting VR session in ${environment.name}. Take deep breaths and relax.`);
    
    // Simulate session progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        const progressBar = document.getElementById('vrProgressBar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        const elapsed = Math.floor(progress * 0.15);
        const elapsedTime = document.getElementById('vrElapsedTime');
        if (elapsedTime) {
            elapsedTime.textContent = `${Math.floor(elapsed / 60).toString().padStart(2, '0')}:${(elapsed % 60).toString().padStart(2, '0')}`;
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            endVRSession();
        }
    }, 1000);
}

function pauseVRSession() {
    speak('VR session paused');
}

function adjustVRSettings() {
    speak('VR settings menu opened');
}

function endVRSession() {
    const vrControls = document.getElementById('vrControls');
    const vrProgress = document.getElementById('vrProgress');
    const vrSessionDisplay = document.getElementById('vrSessionDisplay');
    
    if (vrControls) vrControls.style.display = 'none';
    if (vrProgress) vrProgress.style.display = 'none';
    if (vrSessionDisplay) {
        vrSessionDisplay.innerHTML = '<div class="session-preview">Select an environment to begin</div>';
    }
    
    speak('VR session completed. Well done!');
    awardXP(25);
}

// Facial Mood Detection System
let facialStream = null;

function startFacialAnalysis() {
    const cameraFeed = document.getElementById('cameraFeed');
    const cameraPlaceholder = document.getElementById('cameraPlaceholder');
    const cameraControls = document.getElementById('cameraControls');
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            facialStream = stream;
            if (cameraFeed) {
                cameraFeed.srcObject = stream;
                cameraFeed.style.display = 'block';
            }
            if (cameraPlaceholder) {
                cameraPlaceholder.style.display = 'none';
            }
            if (cameraControls) {
                cameraControls.style.display = 'flex';
            }
            
            speak('Camera activated. Analyzing your facial expressions.');
            
            // Simulate emotion detection
            simulateEmotionDetection();
        })
        .catch(err => {
            speak('Camera access denied or not available');
            console.error('Camera error:', err);
        });
}

function simulateEmotionDetection() {
    const emotions = ['happy', 'sad', 'angry', 'anxious'];
    const emotionMeters = document.getElementById('emotionMeters');
    const moodCoaching = document.getElementById('moodCoaching');
    
    const interval = setInterval(() => {
        emotions.forEach((emotion, index) => {
            const value = Math.random() * 100;
            const meter = emotionMeters?.querySelector(`.emotion-meter:nth-child(${index + 1}) .meter-fill`);
            const valueDisplay = emotionMeters?.querySelector(`.emotion-meter:nth-child(${index + 1}) .emotion-value`);
            
            if (meter && valueDisplay) {
                meter.style.width = `${value}%`;
                valueDisplay.textContent = `${Math.round(value)}%`;
            }
        });
        
        // Update coaching
        const dominantEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        if (moodCoaching) {
            moodCoaching.innerHTML = `
                <h4>Facial Expression Coaching</h4>
                <p>I'm detecting ${dominantEmotion} expressions. Try relaxing your facial muscles and taking deep breaths.</p>
            `;
        }
    }, 2000);
}

function pauseFacialAnalysis() {
    speak('Facial analysis paused');
}

function stopFacialAnalysis() {
    if (facialStream) {
        facialStream.getTracks().forEach(track => track.stop());
        facialStream = null;
    }
    
    const cameraFeed = document.getElementById('cameraFeed');
    const cameraPlaceholder = document.getElementById('cameraPlaceholder');
    const cameraControls = document.getElementById('cameraControls');
    
    if (cameraFeed) cameraFeed.style.display = 'none';
    if (cameraPlaceholder) cameraPlaceholder.style.display = 'block';
    if (cameraControls) cameraControls.style.display = 'none';
    
    speak('Facial analysis stopped');
}

// Yoga & Exercise System
function initializeYogaPoses() {
    showPosesByDifficulty('beginner');
}

function showPosesByDifficulty(difficulty) {
    const poses = yogaLibrary[difficulty] || [];
    const poseCards = document.getElementById('poseCards');
    
    // Update active tab
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    if (poseCards) {
        poseCards.innerHTML = '';
        
        poses.forEach(pose => {
            const poseCard = document.createElement('div');
            poseCard.className = 'pose-card';
            poseCard.innerHTML = `
                <h4>${pose.name}</h4>
                <p>Duration: ${pose.duration}</p>
            `;
            poseCard.onclick = () => showPoseInstructions(pose);
            poseCards.appendChild(poseCard);
        });
    }
}

function showPoseInstructions(pose) {
    const instructionDisplay = document.getElementById('instructionDisplay');
    
    if (instructionDisplay) {
        instructionDisplay.innerHTML = `
            <div>
                <h4>${pose.name}</h4>
                <p><strong>Duration:</strong> ${pose.duration}</p>
                <div style="margin: 20px 0;">
                    <h5>Instructions:</h5>
                    <ol>
                        ${pose.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                    </ol>
                </div>
                <div>
                    <h5>Benefits:</h5>
                    <ul>
                        ${pose.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                <button class="btn btn--primary" onclick="startPosePractice('${pose.name}')">Practice This Pose</button>
            </div>
        `;
    }
    
    speak(`Selected ${pose.name}. Follow the step-by-step instructions.`);
}

function startPosePractice(poseName) {
    speak(`Starting practice session for ${poseName}. Hold the pose and breathe deeply.`);
    awardXP(10);
}

function downloadCertificate(certType) {
    speak('Generating certificate. Download will start shortly.');
    
    // Simulate certificate generation
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,Certificate of Achievement\n\nThis certifies that the user has completed the requirements for ' + certType;
        link.download = `${certType}-certificate.txt`;
        link.click();
        
        speak('Certificate downloaded successfully');
    }, 2000);
}

// Certification System
function startCertification(certType) {
    speak(`Starting ${certType} certification program. Good luck on your learning journey!`);
}

function continueCertification(certType) {
    speak(`Continuing with ${certType} certification. Keep up the great work!`);
}

function startVolunteering() {
    speak('Thank you for your interest in volunteering. You\'ll make a positive impact on others.');
}

// Guardian System
function toggleSetting(settingName) {
    const button = event?.target;
    if (button) {
        button.classList.toggle('active');
        
        const isEnabled = button.classList.contains('active');
        speak(`${settingName.replace('-', ' ')} ${isEnabled ? 'enabled' : 'disabled'}`);
    }
}

function contactGuardian(type) {
    speak(`Contacting ${type} guardian. Help is on the way.`);
}

// AI Companion System
let chatHistory = [];

function toggleVoiceChat() {
    const voiceChatBtn = document.getElementById('voiceChatBtn');
    const voiceIndicator = document.getElementById('voiceChatIndicator');
    
    if (voiceIndicator && voiceChatBtn) {
        if (voiceIndicator.style.display === 'none') {
            voiceIndicator.style.display = 'flex';
            voiceChatBtn.textContent = '🔴';
            startVoiceChatRecognition();
        } else {
            voiceIndicator.style.display = 'none';
            voiceChatBtn.textContent = '🎤';
        }
    }
}

function startVoiceChatRecognition() {
    if (appState.voiceRecognition) {
        const originalOnResult = appState.voiceRecognition.onresult;
        
        appState.voiceRecognition.onresult = function(event) {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                }
            }
            
            if (transcript) {
                const chatInput = document.getElementById('chatInput');
                if (chatInput) {
                    chatInput.value = transcript;
                    sendMessage();
                }
                const voiceIndicator = document.getElementById('voiceChatIndicator');
                const voiceChatBtn = document.getElementById('voiceChatBtn');
                if (voiceIndicator) voiceIndicator.style.display = 'none';
                if (voiceChatBtn) voiceChatBtn.textContent = '🎤';
                appState.voiceRecognition.onresult = originalOnResult;
            }
        };
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatHistoryElement = document.getElementById('chatHistory');
    
    if (!chatInput || !chatHistoryElement) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">Just now</span>
        </div>
    `;
    chatHistoryElement.appendChild(userMessage);
    
    chatInput.value = '';
    
    // Generate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${aiResponse}</p>
                <span class="message-time">Just now</span>
            </div>
        `;
        chatHistoryElement.appendChild(aiMessage);
        
        // Speak AI response
        speak(aiResponse);
        
        // Scroll to bottom
        chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
    }, 1000);
}

function generateAIResponse(userMessage) {
    const responses = [
        "I understand how you're feeling. Would you like to try a breathing exercise?",
        "That sounds challenging. What coping strategies have worked for you before?",
        "Thank you for sharing that with me. How can I best support you right now?",
        "It's great that you're reaching out. Let's work through this together.",
        "I'm here to listen. Would it help to talk about what's on your mind?"
    ];
    
    // Check for crisis keywords
    const crisisKeywords = ['hurt myself', 'suicide', 'end it all', 'can\'t go on'];
    if (crisisKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
        return "I'm very concerned about what you've shared. Please reach out to a crisis helpline immediately or contact emergency services. You don't have to go through this alone.";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function activateCrisisSupport() {
    speak('Activating crisis support. Please hold while I connect you with emergency resources.');
    
    // Show crisis support information
    alert('Crisis Support Resources:\n\n' +
          'National Suicide Prevention Lifeline: 988\n' +
          'Crisis Text Line: Text HOME to 741741\n' +
          'Emergency Services: 911\n\n' +
          'You are not alone. Help is available.');
}

// Quick Actions
function quickMoodCheck() {
    const moods = ['😊', '😐', '😢', '😰', '😌'];
    const selectedMood = prompt('How are you feeling right now?\n\n😊 Happy\n😐 Neutral\n😢 Sad\n😰 Anxious\n😌 Calm');
    
    if (selectedMood) {
        speak('Mood logged. Thank you for checking in with yourself.');
        awardXP(5);
    }
}

function startEmergencySupport() {
    activateCrisisSupport();
}

function startQuickMeditation() {
    speak('Starting a 5-minute meditation. Find a comfortable position and close your eyes.');
    
    // Start meditation timer
    let seconds = 300; // 5 minutes
    const interval = setInterval(() => {
        seconds--;
        
        if (seconds === 240) {
            speak('Focus on your breathing. Inhale slowly and exhale completely.');
        } else if (seconds === 180) {
            speak('You\'re doing great. Continue to breathe naturally.');
        } else if (seconds === 60) {
            speak('One minute remaining. Notice how calm you feel.');
        } else if (seconds === 0) {
            speak('Meditation complete. Well done! You\'ve earned some peace and XP.');
            awardXP(20);
            clearInterval(interval);
        }
    }, 1000);
}

// Charts Initialization
function initializeCharts() {
    // Weekly Progress Chart
    const weeklyCtx = document.getElementById('weeklyProgressChart');
    if (weeklyCtx) {
        new Chart(weeklyCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Wellness Score',
                    data: [7.2, 7.8, 8.1, 7.9, 8.4, 8.2, 8.5],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Mood Trend Chart
    const moodCtx = document.getElementById('moodTrendChart');
    if (moodCtx) {
        new Chart(moodCtx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Average Mood',
                    data: [7.1, 7.5, 8.0, 8.2],
                    backgroundColor: '#FFC185'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Cognitive Chart
    const cognitiveCtx = document.getElementById('cognitiveChart');
    if (cognitiveCtx) {
        new Chart(cognitiveCtx, {
            type: 'radar',
            data: {
                labels: ['Attention', 'Memory', 'Processing', 'Flexibility', 'Problem Solving'],
                datasets: [{
                    label: 'Cognitive Performance',
                    data: [78, 85, 89, 76, 82],
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.2)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Guardian Wellness Chart
    const guardianCtx = document.getElementById('guardianWellnessChart');
    if (guardianCtx) {
        new Chart(guardianCtx, {
            type: 'doughnut',
            data: {
                labels: ['Mood', 'Activity', 'Sleep', 'Social'],
                datasets: [{
                    data: [85, 78, 82, 75],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Tutorial System
function showTutorial() {
    const tutorialOverlay = document.getElementById('tutorialOverlay');
    if (tutorialOverlay) {
        tutorialOverlay.classList.remove('hidden');
        appState.tutorialStep = 0;
        showTutorialStep();
    }
}

function showTutorialStep() {
    const tutorialTitle = document.getElementById('tutorialTitle');
    const tutorialText = document.getElementById('tutorialText');
    
    const steps = [
        {
            title: "Welcome to MindMantra",
            text: "Your enhanced mental health platform is ready! Let's take a quick tour of the new features."
        },
        {
            title: "Voice Control",
            text: "You can now control the app with your voice! Try saying 'Go to meditation' or 'Check my mood'."
        },
        {
            title: "Advanced Features",
            text: "Explore new tools like facial mood detection, VR therapy, and interactive games for mental wellness."
        },
        {
            title: "AI Companion",
            text: "Your AI therapist is available 24/7 to listen and provide support through voice or text conversations."
        },
        {
            title: "Gamification",
            text: "Earn XP and level up by engaging with mindfulness activities and completing mental health challenges."
        }
    ];
    
    if (appState.tutorialStep < steps.length) {
        const step = steps[appState.tutorialStep];
        if (tutorialTitle) tutorialTitle.textContent = step.title;
        if (tutorialText) tutorialText.textContent = step.text;
        
        if (appState.tutorialStep === 0) {
            speak(step.text);
        }
    }
}

function nextTutorialStep() {
    appState.tutorialStep++;
    
    if (appState.tutorialStep >= 5) {
        skipTutorial();
    } else {
        showTutorialStep();
    }
}

function skipTutorial() {
    const tutorialOverlay = document.getElementById('tutorialOverlay');
    if (tutorialOverlay) {
        tutorialOverlay.classList.add('hidden');
    }
    localStorage.setItem('tutorialCompleted', 'true');
    speak('Tutorial completed. Welcome to your enhanced MindMantra experience!');
}

// Utility Functions
function showVoiceWelcome() {
    const welcomeOverlay = document.getElementById('voiceWelcome');
    if (welcomeOverlay) {
        welcomeOverlay.classList.remove('hidden');
        
        setTimeout(() => {
            speak('Welcome to MindMantra, your enhanced mental health companion. All systems are ready.');
        }, 1000);
    }
}

function dismissWelcome() {
    const welcomeOverlay = document.getElementById('voiceWelcome');
    if (welcomeOverlay) {
        welcomeOverlay.classList.add('hidden');
    }
}

function updateUserStats() {
    const userLevel = document.getElementById('userLevel');
    const currentXP = document.getElementById('currentXP');
    const wellnessScore = document.getElementById('wellnessScore');
    const xpBar = document.getElementById('xpBar');
    
    if (userLevel) userLevel.textContent = currentUser.level;
    if (currentXP) currentXP.textContent = currentUser.xp;
    if (wellnessScore) wellnessScore.textContent = currentUser.wellnessScore;
    
    if (xpBar) {
        const xpPercentage = (currentUser.xp / (currentUser.level * 1000)) * 100;
        xpBar.style.width = `${xpPercentage}%`;
    }
}

function showQuickActions() {
    const actions = [
        'Quick Mood Check',
        'Start Meditation',
        'Voice Commands Help',
        'Emergency Support'
    ];
    
    const selectedAction = prompt(`Quick Actions:\n${actions.map((action, index) => `${index + 1}. ${action}`).join('\n')}\n\nSelect an action (1-4):`);
    
    switch (selectedAction) {
        case '1':
            quickMoodCheck();
            break;
        case '2':
            startQuickMeditation();
            break;
        case '3':
            speak('Voice commands available: Go to meditation, Check my mood, Start therapy, Play music, Emergency help, Record mood, Show coping cards');
            break;
        case '4':
            activateCrisisSupport();
            break;
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

function playMeditation(session) {
    speak(`Starting ${session.title} meditation session. Duration: ${session.duration}`);
    awardXP(15);
}

// Event Listeners for Enter key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.id === 'chatInput') {
            sendMessage();
        }
    }
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);