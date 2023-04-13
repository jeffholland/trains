const trainCostGrowthRatio = 1.6;

const transitElement = document.getElementById("transit");



// utilities

const calculateDepartureTime = (departureTimeStr) => {
    // Converts time string as returned by html input time element
    // to 4-element array:
    // [days, hours, minutes, seconds]

    let days = dayCount;

    let hours = parseInt(departureTimeStr.slice(0, 2));
    let minutes = parseInt(departureTimeStr.slice(3, 5));

    // Departure time can't be before current time,
    // so if that's the case, assume next day departure
    if (hours < timeHours
        || (hours == timeHours && minutes <= timeMinutes)) {
        days += 1;
    }

    let seconds = 0;

    return [days, hours, minutes, seconds]
}

const calculateArrivalTime = (departureTime, distance) => {
    // expects departure time as 4-element array:
    // [days, hours, minutes, seconds]

    // distance of 5 is equivalent to one hour

    // return arrival time as 4-element array:
    // [days, hours, minutes, seconds]

    let distanceRemaining = distance;

    let days = departureTime[0];
    let hours = departureTime[1];
    let minutes = departureTime[2];
    let seconds = departureTime[3];

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



// add train

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



// send train

let tripIdCounter = 0;

const sendTrain = (sourceIndex, destIndex) => {

    const source = cities[sourceIndex]["name"];
    const dest = cities[destIndex]["name"];

    if (cities[sourceIndex]["numTrains"] > 0) {

        const departureTimeStr = cities[sourceIndex]["sendTrainTimeElement"].value;
        const departureTime = calculateDepartureTime(departureTimeStr);
        const distance = calculateDistance(sourceIndex, destIndex);
        const arrivalTime = calculateArrivalTime(departureTime, distance);

        cities[sourceIndex]["numTrains"] -= 1;
        cities[sourceIndex]["numTrainsElement"].innerHTML = cities[sourceIndex]["numTrains"]

        const newChild = transitElement.appendChild(
            document.createElement("p")
        );
        newChild.innerHTML = `
            <strong> ${source} -> ${dest} </strong><br/>
            <strong> Status: </strong> <em><span id="tripStatus${tripIdCounter}"> Awaiting departure</span></em><br/>
            <strong> Passengers: </strong> <span id="passengers${tripIdCounter}">0</span>
            <strong> Departure: </strong> day ${departureTime[0]} at ${getTimeFmtStr(departureTime[1], departureTime[2], departureTime[3])}<br/>
            <strong> Arrival: </strong> day ${arrivalTime[0]} at ${getTimeFmtStr(arrivalTime[1], arrivalTime[2], arrivalTime[3])}
        `;
        const tripStatusElement = document.getElementById(`tripStatus${tripIdCounter}`);
        const passengersElement = document.getElementById(`passengers${tripIdCounter}`)

        // push recurring event to add passengers
        let passengers = 0;
        let passengersFloat = 0.0;

        recurringEvents.push({
            "id": tripIdCounter,
            "execute": function() {
                // todo - encapsulate in a function
                // and make it depend on source and dest city populations
                // and other variables...f
                passengersFloat += Math.random() * secondInterval;
                console.log(passengersFloat);
                passengers = Math.floor(passengersFloat);
                passengersElement.innerHTML = passengers;
            }
        })

        // push departure event
        events.push({
            "days": departureTime[0],
            "hours": departureTime[1],
            "minutes": departureTime[2],
            "seconds": departureTime[3],
            "execute": function() {
                removeRecurringEvent(tripIdCounter);
                tripStatusElement.innerHTML = "Departed";
            }
        })

        // push arrival event
        events.push({
            "days": arrivalTime[0],
            "hours": arrivalTime[1],
            "minutes": arrivalTime[2],
            "seconds": arrivalTime[3],
            "execute": function() {
                cities[destIndex]["numTrains"] += 1;
                cities[destIndex]["numTrainsElement"].innerHTML = cities[destIndex]["numTrains"]

                tripStatusElement.innerHTML = "Arrived"

                // After arrival, remove event after timeout
                setTimeout(() => {
                    transitElement.removeChild(newChild);
                }, 4000);
            }
        });

    } else {
        alert(`No trains available in ${source} to send`)
    }

    tripIdCounter++;
}



// add train functionality to cities

for (let i = 0; i < cities.length; i++) {

    cities[i]["addTrainsElement"].addEventListener('click', function(){
        addTrain(i);
    })

    for (let j = 0; j < cities.length; j++) {
        // For each city that is not the current city
        if (j != i) {
            const stationOptionElement = cities[i]["selectStationElement"].appendChild(
                document.createElement("option")
            )
            stationOptionElement.innerHTML = cities[j]["name"];
        }
    }

    cities[i]["sendTrainsElement"].addEventListener('click', function() {
        let destIndex = cities[i]["selectStationElement"].selectedIndex;

        if (destIndex >= i) {
            destIndex += 1; // offset by the source station
        }

        sendTrain(i, destIndex);
    })
}