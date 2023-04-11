/* clock */

const clockElement = document.getElementById("clock");
const dayCountElement = document.getElementById("dayCount");

let timeSeconds = 0;
let timeMinutes = 0;
let timeHours = 0;
let timeFmtStr;

let secondInterval = 1; // seconds that pass each time updateTime is called
let frequency = 1000; // ms between each updateTime call

let dayCount = 0;

const setTime = () => {
    timeFmtStr = `${timeHours.toString().padStart(2, '0')}:${timeMinutes.toString().padStart(2, '0')}:${timeSeconds.toString().padStart(2, '0')}` 
    clockElement.innerHTML = "Current time: " + timeFmtStr;
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

    setTime();
    dayCountElement.innerHTML = dayCount;
}

let updateTimeIntervalId = setInterval(updateTime, 1000);

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

    console.log("frequency: " + frequency);
    console.log("secondInterval: " + secondInterval);

    updateTimeIntervalId = setInterval(updateTime, frequency);

    speedElement.innerHTML = newSpeed;
}

speedSliderElement.oninput = function() {
    setSpeed(this.value);
}

/* city stations */

const leftColumnElement = document.getElementById("left-column");

const cities = [
    {
        "name": "New York",
        "x": 90,
        "y": 75
    },
    {
        "name": "Los Angeles",
        "x": 5,
        "y": 10
    },
    {
        "name": "Chicago",
        "x": 70,
        "y": 80
    },
    {
        "name": "Houston",
        "x": 50,
        "y": 5
    },
    {
        "name": "Philadelphia",
        "x": 85,
        "y": 70
    }
];

let text = "";

function createCity (city, numTrains) {
    city["numTrains"] = numTrains;
    return `
    <div class="border-box">
        <h2>${city["name"]}</h2>
        <button id="addtrain">Add train</button>
        <p>
            Trains: ${city["num_trains"]} 
        </p>
        <p>
            Unscheduled trains: ${city["num_trains"]} 
        </p>
    </div>`;
}

for (let i = 0; i < cities.length; i++) {
    text += createCity(cities[i])
}

leftColumnElement.innerHTML = text;