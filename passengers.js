/* ============================================================ */
/* ======================== PASSENGERS ======================== */
/* ============================================================ */

const debug = true;
let debugNow = false;
let debugIncrement = 0;
const debugLimit = 1000;

const getPassengerIncrement = (sourceIndex, destIndex, departureHour) => {
    let increment = 0;

    // increment increases at a rate affected by the demand and an element of randomness.
    // demand has already been calculated based on city population, time of day, and ticket price.
    let sourceDemandInc = (cities[sourceIndex]["demand"] / 1500) * Math.random();
    let destDemandInc = (cities[destIndex]["demand"] / 10000) * Math.random();

    // also at play, but less significant, is the hour of departure for the train
    let departureTimeInc = (timeDemandMap[departureHour] / 100000) * Math.random();

    // cut off really small increments to 0
    if (sourceDemandInc < 0.001) {
        sourceDemandInc = 0.0;
    }
    if (destDemandInc < 0.001) {
        destDemandInc = 0.0;
    }
    if (departureTimeInc < 0.0001) {
        departureTimeInc = 0.0;
    }
     
    // add it all together to get the increment
    increment += sourceDemandInc;
    increment += destDemandInc;
    increment += departureTimeInc;

    // make sure we're incrementing at the correct speed
    increment *= secondInterval;
    
    // debug code
    debugIncrement++;
    if (debugIncrement >= debugLimit){
        debugNow = true;
    } else {
        debugNow = false;
    }

    if (debug && debugNow) {
        console.log(`sourceDemandInc: ${sourceDemandInc}`);
        console.log(`destDemandInc: ${destDemandInc}`);
        console.log(`departureTimeInc: ${departureTimeInc}`);
        console.log(`increment: ${increment}`);
        console.log(`secondInterval: ${secondInterval}`)
        debugIncrement = 0;
    }

    return increment;
}