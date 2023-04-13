
// updateTime function runs on a loop
// game events are scheduled according to the clock

const clockElement = document.getElementById("clock");
const dayCountElement = document.getElementById("dayCount");

let timeHours = 0;
let timeMinutes = 0;
let timeSeconds = 0;
let timeSecondsFloat = 0.0; // seconds is always floored to an int
// we don't need greater precision than that

const frequency = 5; // update time interval fixed to 5 ms
let secondInterval = frequency / 1000; // seconds that pass each time updateTime is called

let dayCount = 0;

const getTimeFmtStr = (hours, minutes, seconds) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const setTime = () => {
    clockElement.innerHTML = "Current time: " + getTimeFmtStr(timeHours, timeMinutes, timeSeconds);
    dayCountElement.innerHTML = dayCount;
}
setTime();

const updateTime = () => {
    timeSecondsFloat += secondInterval;
    timeSeconds = Math.floor(timeSecondsFloat);

    while (timeSeconds >= 60) {
        timeMinutes += 1;
        timeSeconds -= 60;
        timeSecondsFloat -= 60;
    }
    while (timeMinutes >= 60) {
        timeHours += 1;
        timeMinutes -= 60;
    }
    while (timeHours >= 24) {
        dayCount += 1;
        timeHours -= 24;
    }

    checkForEvents();
    checkForRecurringEvents();
    setTime();
}

/* clock speed */

const speedSliderElement = document.getElementById("speedSlider");
const speedElement = document.getElementById("speed");

const setSpeed = (newSpeed) => {
    // Min speed is 1: 5 ms per 5 ms = 1 sec per sec
    // Max speed is 100: 50 seconds per 5 ms = 10000 sec or 2.7 hours per sec
    secondInterval = (frequency * Math.pow(newSpeed, 2)) / 1000;
    speedElement.innerHTML = newSpeed;
}

speedSliderElement.oninput = function() {
    setSpeed(this.value);
}

setInterval(updateTime, frequency)