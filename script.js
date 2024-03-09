const breakLength = document.getElementById("break-length");
const sessionLength = document.getElementById("session-length");
const timerLabel = document.getElementById("timer-label");
const timeLeft = document.getElementById("time-left");
const timerControl = document.getElementById("start_stop"); 
const beep = document.getElementById("beep");

let timeLeftValue = 25*60;
let isTimerStop = true;

const timeFormat = (time) => {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);

    timeLeft.className = minutes < 1 ? "red-color" : "";
    seconds = seconds < 10 ? "0" + seconds : seconds.toString();
    minutes = minutes < 10 ? "0" + minutes : minutes.toString();

    timeLeft.innerText = `${minutes}:${seconds}`;
}

const increment = (label, lengthElement) => {
    let time = Number(lengthElement.innerText);
    if (isTimerStop && time < 60) {
        time += 1;
        lengthElement.innerText = time;
        timeLeftValue = timerLabel.innerText === label ? time*60 : timeLeftValue;
        timeFormat(timeLeftValue);
    }
}

const decrement = (label, lengthElement) => {
    let time = Number(lengthElement.innerText);
    if (isTimerStop && time > 1) {
        time -= 1;
        lengthElement.innerText = time;
        timeLeftValue = timerLabel.innerText === label ? time*60 : timeLeftValue;
        timeFormat(timeLeftValue);
    }
}

const timerToggle = () => {
    isTimerStop = !isTimerStop;
}

const resetTimer = () => {
    isTimerStop = true;
    breakLength.innerText = 5;
    sessionLength.innerText = 25;
    timeLeftValue = 25 * 60;
    timerLabel.innerText = "Session";
    isTimerStop = true;
    timeFormat(timeLeftValue);
}

setInterval(() => {
    if (!isTimerStop) {
        beep.pause();
        if (timeLeftValue > 0) {
            timeLeftValue -= 1;
            timeFormat(timeLeftValue);
            console.log(`time left: ${timeLeftValue} timer label: ${timerLabel.innerText}`)
        } else {
            beep.currentTime = 0;
            beep.play();
            isTimerStop = true;
            timerLabel.innerText = timerLabel.innerText === "Session" ? "Break" : "Session";
            timeLeftValue = timerLabel.innerText === "Session" ? Number(sessionLength.innerText) * 60 : Number(breakLength.innerText) * 60 ;
            timeFormat(timeLeftValue);
        }
    }
}, 1000)

