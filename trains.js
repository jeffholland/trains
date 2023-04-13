const leftColumnElement = document.getElementById("left-column");
const trainCostGrowthRatio = 1.6;

const addTrain = (index) => {
    // Pay for the cost of the train
    fundsAvailable -= cities[index]["trainCost"];
    fundsAvailableElement.innerHTML = fundsAvailable;

    // Cost of the train increases
    cities[index]["trainCost"] *= trainCostGrowthRatio;
    cities[index]["trainCostElement"].innerHTML = cities[index]["trainCost"]

    // Add the train
    cities[index]["numTrains"] += 1;
    cities[index]["numTrainsElement"].innerHTML = cities[index]["numTrains"]
}

const calculateDistance = (sourceIndex, destIndex) => {
    // Get x and y coordinates of both cities
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
    // Based on current time and distance,
    // return 4-element array representing arrival time as:
    // [days, hours, minutes, seconds]

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
    while (hours >= 24) {
        hours -= 24;
        days += 1;
    }

    // minutes
    const distanceRemainingInMinutes = (distanceRemaining / 5) * 60;
    const minutesAdded = Math.floor(distanceRemainingInMinutes);
    minutes += minutesAdded;
    while (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    }
    while (hours >= 24) {
        hours -= 24;
        days += 1;
    }

    // seconds
    const distanceRemainingInSeconds = (distanceRemainingInMinutes - minutesAdded) * 60;
    const secondsAdded = Math.floor(distanceRemainingInSeconds);
    seconds += secondsAdded;
    while (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
    }
    while (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    }
    while (hours >= 24) {
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

        const newChild = transitElement.appendChild(
            document.createElement("p")
        );
        newChild.innerHTML = `
            <strong> ${source} -> ${dest} </strong><br/>
            <strong> Departure: </strong> day ${dayCount} at ${getTimeFmtStr(timeHours, timeMinutes, timeSeconds)}<br/>
            <strong> Arrival: </strong> day ${arrivalTime[0]} at ${getTimeFmtStr(arrivalTime[1], arrivalTime[2], arrivalTime[3])}
        `;

        events.push({
            "days": arrivalTime[0],
            "hours": arrivalTime[1],
            "minutes": arrivalTime[2],
            "seconds": arrivalTime[3],
            "execute": function() {
                cities[destIndex]["numTrains"] += 1;
                cities[destIndex]["numTrainsElement"].innerHTML = cities[destIndex]["numTrains"]

                // Show message that train has arrived for 5 seconds
                newChild.innerHTML = `
                    <strong> ${source} -> ${dest} </strong><br/>Arrived`;
                setTimeout(() => {
                    transitElement.removeChild(newChild);
                }, 4000);
            }
        });

    } else {
        alert(`No trains available in ${source} to send`)
    }
}

// create cities
let text = "";

for (let i = 0; i < cities.length; i++) {
    text += createCity(cities[i])
}
leftColumnElement.innerHTML = text;

// fill cities with info
for (let i = 0; i < cities.length; i++) {
    cities[i]["numTrains"] = 0;
    cities[i]["numTrainsElement"] = document.getElementById(cities[i]["name"] + "NumTrains");
    cities[i]["numTrainsElement"].innerHTML = cities[i]["numTrains"];

    cities[i]["trainCost"] = 1000;
    cities[i]["trainCostElement"] = document.getElementById(cities[i]["name"] + "TrainCost")
    cities[i]["trainCostElement"].innerHTML = cities[i]["trainCost"];

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