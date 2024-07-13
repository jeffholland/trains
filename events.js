/* ======================================================== */
/* ======================== EVENTS ======================== */
/* ======================================================== */

// To schedule something to happen, add an object to the events array
// with the following object keys:
// days, hours, minutes, seconds, execute
// where the first four are numbers and the last is a function
// to execute at the specified time.

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

// To make an event happen on a recurring basis,
// add an object to the recurringEvents array
// with the following object keys:
// id, execute
// where id is a unique int to identify the item
// and execute is the function that is called on each call of updateTime

const recurringEvents = [];

const checkForRecurringEvents = () => {
    for (let i = 0; i < recurringEvents.length; i++) {
        recurringEvents[i]["execute"]()
    }
}

const removeRecurringEvent = (id) => {
    for (let i = 0; i < recurringEvents.length; i++) {
        if (recurringEvents[i]["id"] == id) {
            recurringEvents.splice(i, 1);
        }
    } 
}