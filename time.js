/* ============================================================== */
/* ============================ TIME ============================ */
/* ============================================================== */

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
    const distX = Math.abs(sourceX - destX);
    const distY = Math.abs(sourceY - destY);
    const distance = Math.pow(Math.pow(distX, 2) + Math.pow(distY, 2), 0.5)

    return distance;
}