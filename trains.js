

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

transitElement = document.getElementById("transit");

const sendTrain = (sourceIndex, destIndex) => {

    const source = cities[sourceIndex]["name"];
    const dest = cities[destIndex]["name"];

    if (cities[sourceIndex]["numTrains"] > 0) {

        cities[sourceIndex]["numTrains"] -= 1;
        cities[sourceIndex]["numTrainsElement"].innerHTML = cities[sourceIndex]["numTrains"]
        
        console.log(`Sending train from ${source} to ${dest}`);

        const newParagraph = transitElement.appendChild(
            document.createElement("p")
        );
        newParagraph.innerHTML = `Sending train from ${source} to ${dest}`;

        cities[destIndex]["numTrains"] += 1;
        cities[destIndex]["numTrainsElement"].innerHTML = cities[destIndex]["numTrains"]
    } else {
        console.log(`No trains available in ${source} to send`)
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