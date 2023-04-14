// for debugging, so we don't overwhelmed with console.logs
let debugInc = 0;
const debugLimit = 100;

const getPassengerIncrement = (sourceIndex, destIndex) => {
    // todo - make it depend on source and dest city populations
    // and other variables...
    let increment = 0;

    const sourcePopInc = cities[sourceIndex]["population"] / 100000000;
    const destPopInc = cities[destIndex]["population"] / 100000000;

    increment += sourcePopInc * Math.random();
    increment += destPopInc * Math.random();

    increment *= cities[sourceIndex]["demand"];

    increment *= secondInterval;
    
    // for debugging, so we don't overwhelmed with console.logs
    debugInc++;
    if (debugInc >= debugLimit) {
        console.log(`increment: ${increment}`);
        debugInc = 0;
    }

    return increment;
}

const calculateDemand = (ticketPrice) => {
    // Demand is inversely proportional to ticket price
    // set at a standard of $5 per ticket = 100% demand

    return Math.floor(500 / ticketPrice);
}