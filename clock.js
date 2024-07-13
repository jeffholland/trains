/* ======================================================== */
/* ======================== CLOCK ========================= */
/* ======================================================== */

// HTML elements

const clockElement = document.getElementById("clock");
const dayCountElement = document.getElementById("dayCount");

let timeHours = 0;
let timeMinutes = 0;
let timeSeconds = 0;
let timeSecondsFloat = 0.0;

/**
 * demand varies by time
 * index is the time in hours (0 is midnight, 23 is 11pm)
 * value is the demand factor where 100 is the highest, 1 is the lowest.
 * roughly based on Google Maps data for Grand Central Station.
 */

const timeDemandMap = [8,4,2,1,4,10,15,25,45,60,70,75,80,85,90,93,95,95,92,83,70,45,30,15]

const frequency = 5; // default speed is 5 ms
let secondInterval = frequency / 1000; // speed of game is set by this value

let dayCount = 0; // count the number of days since the start of the game

const getTimeFmtStr = (hours, minutes, seconds) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const setTime = () => {
    clockElement.innerHTML = "<strong>Current time:</strong> " + getTimeFmtStr(timeHours, timeMinutes, timeSeconds);
    dayCountElement.innerHTML = dayCount;
}
setTime();

const updateTime = () => {
    // this function is always called every 5 ms
    // (the value of the const variable "frequency")

    // update all time variables according to game speed
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

    // execute any events whose execution time has been reached
    checkForEvents();
    checkForRecurringEvents();
    setTime();

    // update city demand (since it depends on the time of day)
    for (let i = 0; i < cities.length; i++) {
        updateDemand(i);
    }
}

const updateDemand = (i) => {
    // encapsulate demand update to a function
    cities[i]["demand"] = calculateDemand(cities[i]["ticketPrice"], cities[i]["population"])
    cities[i]["demandElement"].innerHTML = floor10(cities[i]["demand"], -2);
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