

/********* 
 * clock *
 *********/ 

const clockElement = document.getElementById("clock");
const dayCountElement = document.getElementById("dayCount");

let timeSeconds = 0;
let timeMinutes = 0;
let timeHours = 0;
let timeFmtStr = "";

let secondInterval = 1; // seconds that pass each time updateTime is called
let frequency = 1000; // ms between each updateTime call

let dayCount = 0;

const getTimeFmtStr = (hours, minutes, seconds) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const setTime = () => {
    timeFmtStr = getTimeFmtStr(timeHours, timeMinutes, timeSeconds);
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



/*****************
 * city stations *
 *****************/

const leftColumnElement = document.getElementById("left-column");

const cities = [
    {
        "name": "New York",
        "x": 90,
        "y": 75
    },
    {
        "name": "Philadelphia",
        "x": 85,
        "y": 70
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
        "name": "Los Angeles",
        "x": 5,
        "y": 10
    }
];

let text = "";

function createCity (city) {
    return `
    <div class="border-box">
        <h2>${city["name"]}</h2>
        <button id="${city["name"]}AddTrain">Add train</button>
        <p>
            <button id="${city["name"]}SendTrain">Send train</button>
            <select id="${city["name"]}SelectStation"></select>
        </p>
        <p>
            Trains: <span id="${city["name"]}NumTrains"></span>
        </p>
    </div>`;
}

const addTrain = (index) => {
    cities[index]["numTrains"] += 1;
    cities[index]["numTrainsElement"].innerHTML = cities[index]["numTrains"]
}

const calculateDistance = (sourceIndex, destIndex) => {
    const sourceX = cities[sourceIndex]["x"];
    const sourceY = cities[sourceIndex]["y"];
    const destX = cities[destIndex]["x"];
    const destY = cities[destIndex]["y"];

    // Pythagorean theorem to get distance between cities
    const distA = Math.abs(sourceX - destX);
    const distB = Math.abs(sourceY - destY);
    const distance = Math.pow(Math.pow(distA, 2) + Math.pow(distB, 2), 0.5)

    return distance;
}

const calculateArrivalTime = (distance) => {
    // Distance of 5 is equivalent to one hour
    let distanceRemaining = distance;
    let days = dayCount;
    let hours = timeHours;
    let minutes = timeMinutes;
    let seconds = timeSeconds;

    // hours
    while (distanceRemaining >= 5) {
        distanceRemaining -= 5;
        hours += 1;
    }
    if (hours >= 24) {
        hours -= 24;
        days += 1;
    }

    // minutes
    const distanceRemainingInMinutes = (distanceRemaining / 5) * 60;
    const minutesAdded = Math.floor(distanceRemainingInMinutes);
    minutes += minutesAdded;
    if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    }
    if (hours >= 24) {
        hours -= 24;
        days += 1;
    }

    // seconds
    const distanceRemainingInSeconds = (distanceRemainingInMinutes - minutesAdded) * 60;
    const secondsAdded = Math.floor(distanceRemainingInSeconds);
    seconds += secondsAdded;
    if (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
    }
    if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    }
    if (hours >= 24) {
        hours -= 24;
        days += 1;
    }

    return [days, hours, minutes, seconds]
}

transitElement = document.getElementById("transit");

const sendTrain = (sourceIndex, destIndex) => {

    const source = cities[sourceIndex]["name"];
    const dest = cities[destIndex]["name"];

    if (cities[sourceIndex]["numTrains"] > 0) {

        cities[sourceIndex]["numTrains"] -= 1;
        cities[sourceIndex]["numTrainsElement"].innerHTML = cities[sourceIndex]["numTrains"]
        
        const distance = calculateDistance(sourceIndex, destIndex);

        const arrivalTime = calculateArrivalTime(distance);
        console.log(arrivalTime)

        const newParagraph = transitElement.appendChild(
            document.createElement("p")
        );
        newParagraph.innerHTML = `
            Sending train from ${source} on day ${dayCount} at ${getTimeFmtStr(timeHours, timeMinutes, timeSeconds)}<br/>
            Arriving in ${dest} on day ${arrivalTime[0]} at ${getTimeFmtStr(arrivalTime[1], arrivalTime[2], arrivalTime[3])}
        `;

        cities[destIndex]["numTrains"] += 1;
        cities[destIndex]["numTrainsElement"].innerHTML = cities[destIndex]["numTrains"]
    } else {
        alert(`No trains available in ${source} to send`)
    }
}

// create cities
for (let i = 0; i < cities.length; i++) {
    text += createCity(cities[i])
}
leftColumnElement.innerHTML = text;

// fill cities with info
for (let i = 0; i < cities.length; i++) {
    cities[i]["numTrains"] = 0;
    cities[i]["numTrainsElement"] = document.getElementById(cities[i]["name"] + "NumTrains");
    cities[i]["numTrainsElement"].innerHTML = cities[i]["numTrains"];

    cities[i]["addTrainsElement"] = document.getElementById(cities[i]["name"] + "AddTrain");
    cities[i]["addTrainsElement"].addEventListener('click', function(){
        addTrain(i);
    })

    cities[i]["selectStationElement"] = document.getElementById(cities[i]["name"] + "SelectStation");
    for (let j = 0; j < cities.length; j++) {
        // For each city that is not the current city
        if (j != i) {
            const stationOptionElement = cities[i]["selectStationElement"].appendChild(
                document.createElement("option")
            )
            stationOptionElement.innerHTML = cities[j]["name"];
        }
    }

    cities[i]["sendTrainsElement"] = document.getElementById(cities[i]["name"] + "SendTrain");

    cities[i]["sendTrainsElement"].addEventListener('click', function() {
        let destIndex = cities[i]["selectStationElement"].selectedIndex;

        if (destIndex >= i) {
            destIndex += 1; // offset by the source station
        }

        sendTrain(i, destIndex);
    })
}