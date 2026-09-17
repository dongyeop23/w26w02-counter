// 설정 값 (초 단위)
const WORK_TIME = 25 * 60; // 25분
const BREAK_TIME = 5 * 60; // 5분

// 상태 변수
let timeLeft = WORK_TIME;
let timerId = null;
let isWorkMode = true;

// DOM 요소
const timerDisplay = document.getElementById('timer');
const modeTitle = document.getElementById('mode-title');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workModeBtn = document.getElementById('work-mode-btn');
const breakModeBtn = document.getElementById('break-mode-btn');

// 시간을 MM:SS 형식으로 변환하여 화면에 표시
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // 두 자릿수 맞춤 (예: 5 -> "05")
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    timerDisplay.textContent = formattedTime;
    document.title = `(${formattedTime}) 뽀모도로 타이머`;
}

// 타이머 시작
function startTimer() {
    if (timerId !== null) return;

    startBtn.disabled = true;
    pauseBtn.disabled = false;

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        // 시간 종료 시
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            
            // 알림음 출력 (기본 시스템 알림 사운드 대신 브라우저 비프음 사용 시 대체 가능)
            alert(isWorkMode ? '작업 시간이 끝났습니다! 휴식을 취하세요.' : '휴식 시간이 끝났습니다! 다시 집중해볼까요?');
            
            // 모드 자동 전환
            switchMode(!isWorkMode);
        }
    }, 1000);
}

// 타이머 일시정지
function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// 타이머 초기화
function resetTimer() {
    pauseTimer();
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateDisplay();
}

// 모드 전환 (작업 <-> 휴식)
function switchMode(toWorkMode) {
    pauseTimer();
    isWorkMode = toWorkMode;

    if (isWorkMode) {
        timeLeft = WORK_TIME;
        modeTitle.textContent = '작업 시간';
        timerDisplay.style.color = '#e74c3c';
        workModeBtn.classList.add('active');
        breakModeBtn.classList.remove('active');
    } else {
        timeLeft = BREAK_TIME;
        modeTitle.textContent = '휴식 시간';
        timerDisplay.style.color = '#2ecc71';
        breakModeBtn.classList.add('active');
        workModeBtn.classList.remove('active');
    }

    updateDisplay();
}

// 이벤트 리스너 등록
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

workModeBtn.addEventListener('click', () => switchMode(true));
breakModeBtn.addEventListener('click', () => switchMode(false));

// 초기 화면 설정
updateDisplay();