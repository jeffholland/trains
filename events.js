// To schedule something to happen, add an object to the events array
// with the following parameters:
// days, hours, minutes, seconds, execute
// where the first four are numbers and the last is a function
// to execute at the specified time.

// The execute function must remove itself from the events array.

const events = []

const checkForEvents = () => {
    for (let i = 0; i < events.length; i++) {
        if (events[i]["days"] <= dayCount
            && events[i]["hours"] <= timeHours
            && events[i]["minutes"] <= timeMinutes
            && events[i]["seconds"] <= timeSeconds)
        {
            events[i]["execute"]()
            events.splice(i, 1);
        }
    }
}

let updateTimeIntervalId = setInterval(updateTime, 1000);
