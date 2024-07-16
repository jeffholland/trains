/* ======================================================== */
/* ======================== TRAINS ======================== */
/* ======================================================== */

const trainCostGrowthRatio = 1.6;
let trainCapacity = 200;
const trainCapacityElement = document.getElementById("trainCapacity");
trainCapacityElement.innerHTML = trainCapacity;

const transitElement = document.getElementById("transit");


// add train

const addTrain = (index) => {
    // Pay for the cost of the train
    try {
        subtractMoney(cities[index]["trainCost"]);
    } catch (e) {
        console.error(e);
        return;
    }

    // Cost of a new train in this city increases
    cities[index]["trainCost"] *= trainCostGrowthRatio;
    cities[index]["trainCostElement"].innerHTML = cities[index]["trainCost"]

    // Add the train to the city
    cities[index]["numTrains"] += 1;
    cities[index]["numTrainsElement"].innerHTML = cities[index]["numTrains"]

    checkButtons();
}


// send train

// counter to allow each train we send to have a unique identifying integer
let tripIdCounter = 0;

/**
 * When we send a train, we create events for the train's departure and arrival,
 * as well as a recurring event for passengers to buy tickets for the trip.
 */
const sendTrain = (sourceIndex, destIndex) => {
    // Increment trip id counter which will be the train trip's unique identifier
    tripIdCounter++;

    // When there is a train trip occurring, the transit box is visible
    const transitBoxElement = document.getElementById("transitBox");
    transitBoxElement.style.visibility = "visible";

    // Get departure and arrival times
    const departureTimeStr = cities[sourceIndex]["sendTrainTimeElement"].value;
    const departureTime = calculateDepartureTime(departureTimeStr);
    const distance = calculateDistance(sourceIndex, destIndex);
    const arrivalTime = calculateArrivalTime(departureTime, distance);

    // Remove the train from the city's pool of available trains
    cities[sourceIndex]["numTrains"] -= 1;
    cities[sourceIndex]["numTrainsElement"].innerHTML = cities[sourceIndex]["numTrains"]

    // Create and add the trip element to the transit box
    const newChild = transitElement.appendChild(
        document.createElement("p")
    );
    const sourceName = cities[sourceIndex]["name"];
    const destName = cities[destIndex]["name"];
    newChild.innerHTML = `
        <strong> ${sourceName} -> ${destName} </strong><br/>
        <strong> Status: </strong> <em><span id="tripStatus${tripIdCounter}"> Awaiting departure</span></em><br/>
        <strong> Passengers: </strong> <span id="passengers${tripIdCounter}">0</span><br/>
        <strong> Departure: </strong> day ${departureTime[0]} at ${getTimeFmtStr(departureTime[1], departureTime[2], departureTime[3])}<br/>
        <strong> Arrival: </strong> day ${arrivalTime[0]} at ${getTimeFmtStr(arrivalTime[1], arrivalTime[2], arrivalTime[3])}
    `;
    const tripStatusElement = document.getElementById(`tripStatus${tripIdCounter}`);
    const passengersElement = document.getElementById(`passengers${tripIdCounter}`)

    // Count the number of passengers for the trip
    let passengers = 0;
    let passengersFloat = 0.0;

    // add trip to city's trips in transit
    cities[sourceIndex]["tripsScheduled"].push({
        "destination": destName,
        "days": departureTime[0],
        "hours": departureTime[1],
        "minutes": departureTime[2],
        "seconds": departureTime[3],
        "id": tripIdCounter
    });

    // Recurring event to increment the number of passengers little by little, based on demand
    recurringEvents.push({
        "id": tripIdCounter,
        "execute": function() {
            // if the train is at capacity, do nothing
            if (passengers < trainCapacity) {

                // the function called below determines how much closer we are to a 
                // passenger buying a ticket for this train.
                passengersFloat += getPassengerIncrement(sourceIndex, destIndex, departureTime[1]);
                const passengerChange = passengersFloat - passengers;
                if (debugNow) {
                    console.log(`passengers float: ${passengersFloat}`);
                }

                // if we're adding a passenger,
                // then they've bought a ticket, so we get money
                if (passengerChange >= 1) {
                    if (debug) {
                        console.log(`Purchased 1 ticket at ${timeHours}:${timeMinutes}`)
                    }
                    passengers = Math.floor(passengersFloat);
                    passengersElement.innerHTML = passengers;

                    addMoney(cities[sourceIndex]["ticketPrice"]);
                }
            } else {
                if (tripStatusElement.innerHTML != "Capacity reached - Awaiting departure") {
                    tripStatusElement.innerHTML = "Capacity reached - Awaiting departure";
                }
            }
        }
    })

    // push departure event
    events.push({
        "days": departureTime[0],
        "hours": departureTime[1],
        "minutes": departureTime[2],
        "seconds": departureTime[3],
        "id": tripIdCounter,
        "execute": function() {
            removeRecurringEvent(this["id"]);
            tripStatusElement.innerHTML = "Departed";

            for (let i = 0; i < cities[sourceIndex]["tripsScheduled"].length; i++) {
                if (this["id"] == cities[sourceIndex]["tripsScheduled"][i]["id"]) {
                    cities[sourceIndex]["tripsScheduled"].splice(i);
                }
            }
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
            checkButtons();

            // After arrival, remove trip from transit box after timeout
            setTimeout(() => {
                transitElement.removeChild(newChild);
                if (transitElement.children.length == 0) {
                    transitBoxElement.style.visibility = "hidden";
                }
            }, 4000);
        }
    });
}