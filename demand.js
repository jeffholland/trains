// this function is called in the 5ms loop
const updateDemand = (sourceIndex) => {
    // Demand is affected by the city in the destination selection box
    const destIndex = cities[sourceIndex]["selectStationElement"].selectedIndex;

    cities[sourceIndex]["demand"] = calculateDemand(sourceIndex, destIndex);
    cities[sourceIndex]["demandElement"].innerHTML = floor10(cities[sourceIndex]["demand"], -2);
}

// formula for calculating demand based on ticket price
const calculateDemand = (sourceIndex, destIndex) => {
    if (cities[sourceIndex]["cityElement"].style.visibility != "visible") {
        return; // for efficiency, skip invisible cities (Calvino pun not intended)
    }

    if (sourceIndex == destIndex) {
        // offset because destIndex is coming from the selector, so source city is skipped
        destIndex += 1;
    }
    
    // 1st factor: city population
    // New York's population has the highest demand,
    // anything less than that gives less demand.
    const sourceCityPop = cities[sourceIndex]["population"];
    const newYorkPop = cities[0]["population"];
    const popFactor = sourceCityPop / newYorkPop;

    // 2nd factor: time of day
    // Demand is mapped by hour,
    // simulating when people are most likely to buy tickets.
    const timeFactor = timeDemandMap[timeHours] / 50;

    // 3rd factor: ticket price
    // Demand is inversely proportional to ticket price
    // set at a standard of $1 per ticket = 100% demand
    const priceFactor = 100 / cities[sourceIndex]["ticketPrice"];

    // 4th factor: for each train going from the same source
    // to the same destination, it decreases the demand.
    let sameTrainCounter = 0;
    let sameTrainFactor = 0.0;
    const tripsScheduled = cities[sourceIndex]["tripsScheduled"];

    if (tripsScheduled != undefined && tripsScheduled.length > 0) {
        let sameTrainIncrementer = 0.0;

        for (let i = 0; i < tripsScheduled.length; i++) {

            if (tripsScheduled[i]["destination"] == cities[destIndex]["name"]) {
                sameTrainCounter += 1;

                if (sameTrainCounter == 1) {
                    continue; // we only care if there is MORE than one train
                }

                // the increment increases by an amount based on how soon the train is departing
                let hoursUntilDeparture = tripsScheduled[i]["hours"] - timeHours;
                if (hoursUntilDeparture < 0) {
                    // offset by one day if negative
                    hoursUntilDeparture += 24;
                }

                const sameTrainIncrement = 1 - (hoursUntilDeparture / 24);
                sameTrainIncrementer += sameTrainIncrement;

            }
        }
        sameTrainFactor = 1 / Math.pow(2, sameTrainIncrementer); // decrease ratio of demand by trains already running
    }
    // Calculate and return
    const result = priceFactor * popFactor * timeFactor * sameTrainFactor;
    return result;
}