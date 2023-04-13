
// updateTime function runs on a loop
// game events are scheduled according to the clock

const clockElement = document.getElementById("clock");
const dayCountElement = document.getElementById("dayCount");

let timeSeconds = 0;
let timeMinutes = 0;
let timeHours = 0;

let secondInterval = 1; // seconds that pass each time updateTime is called
let frequency = 1000; // ms between each updateTime call

let dayCount = 0;

const getTimeFmtStr = (hours, minutes, seconds) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const setTime = () => {
    clockElement.innerHTML = "Current time: " + getTimeFmtStr(timeHours, timeMinutes, timeSeconds);
}
setTime();

const updateTime = () => {
    timeSeconds += secondInterval;

    if (timeSeconds >= 60) {
        while (timeSeconds >= 60) {
            timeMinutes += 1;
            timeSeconds = timeSeconds - 60;
        }
    }
    if (timeMinutes >= 60) {
        while (timeMinutes >= 60) {
            timeHours += 1;
            timeMinutes = timeMinutes - 60;
        }
    }
    if (timeHours >= 24) {
        while (timeHours >= 24) {
            dayCount += 1;
            timeHours = timeHours - 24;
        }
    }

    checkForEvents();

    setTime();
    dayCountElement.innerHTML = dayCount;
}

/* clock speed */

const speedSliderElement = document.getElementById("speedSlider");
const speedElement = document.getElementById("speed");

const setSpeed = (newSpeed) => {
    // 1 is normal, 2 is double, etc.
    clearInterval(updateTimeIntervalId);

    frequency = Math.floor(1000 / newSpeed);
    if (newSpeed > 20) {
        secondInterval = 1 + ((newSpeed - 20));
    } else {
        secondInterval = 1;
    }

    updateTimeIntervalId = setInterval(updateTime, frequency);

    speedElement.innerHTML = newSpeed;
}

speedSliderElement.oninput = function() {
    setSpeed(this.value);
}
