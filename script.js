let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');
let customMinutesInput = document.getElementById('customMinutes');
let setCustomTimeButton = document.getElementById('setCustomTime');
let toggleThemeButton = document.getElementById('toggleTheme');

let workTime = 25 * 60; // 25 minutes
let timeLeft = workTime;
let timer = null;
let customTime = null;

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            alert("Time's up! Take a 5 min break!");
            timer = null;
            timeLeft = 5 * 60;  // 5 minute break
            updateDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    timeLeft = workTime;
    updateDisplay();
}

function updateThemeToggle() {
    if (document.body.classList.contains('dark-mode')) {
        toggleThemeButton.textContent = '☀️';
        toggleThemeButton.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
        toggleThemeButton.textContent = '🌙';
        toggleThemeButton.setAttribute('aria-label', 'Switch to Dark Mode');
    }
}

setCustomTimeButton.addEventListener('click', () => {
    const minutes = parseInt(customMinutesInput.value, 10);
    if (!isNaN(minutes) && minutes > 0) {
        customTime = minutes * 60;
        timeLeft = customTime;
        workTime = customTime;
        updateDisplay();
    }
});

toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateThemeToggle();
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
updateThemeToggle(); // Call once on load to set correct label
