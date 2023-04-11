/* constant ints */

const defaultInterval = 100; // loop interval in ms

const trainCostStart = 1000;   // starting cost to build a train
const marketingCostStart = 1000; // starting cost to upgrade marketing
const ticketPriceStart = 15;    // price of a train ticket

/* constant floats */

const marketingRate = 0.325;
const trainRate = 0.643;
const popGrowthRate = 0.1;

const trainCostGrowthRate = 1.1;
const marketingCostGrowthRate = 1.5;



/* mutable ints */

let moneyCount = 20000;
let trainCount = 0;
let marketingCount = 0;
let peopleCount = 0;
let peopleCountChange;

let trainCost = trainCostStart;
let marketingCost = marketingCostStart;
let ticketPrice = ticketPriceStart;

/* mutable floats */

let peopleCountChangeFloat;
let trainCostFloat = trainCost;
let marketingCostFloat = marketingCost;

let demandRate = 1.0; // ticketPrice / ticketPriceStart
let demandPercentage = demandRate * 100.0;



/* DOM elements */

const moneyCountElement = document.getElementById("moneyCount");

const btnAddTrainElement = document.getElementById("btnAddTrain");
const trainCountElement = document.getElementById("trainCount");
const trainCostElement = document.getElementById("trainCost");

const btnAddMarketingElement = document.getElementById("btnAddMarketing");
const marketingCountElement = document.getElementById("marketingCount");
const marketingCostElement = document.getElementById("marketingCost");

const btnIncreaseTicketPriceElement = document.getElementById("btnIncreaseTicketPrice");
const btnDecreaseTicketPriceElement = document.getElementById("btnDecreaseTicketPrice");
const ticketPriceElement = document.getElementById("ticketPrice");

const demandPercentageElement = document.getElementById("demandPercentage")

const peopleCountElement = document.getElementById("peopleCount");



/* DOM initialization */ 

trainCostElement.innerHTML = trainCostStart;
marketingCostElement.innerHTML = marketingCostStart;
moneyCountElement.innerHTML = moneyCount;
trainCountElement.innerHTML = trainCount;
marketingCountElement.innerHTML = marketingCount;
ticketPriceElement.innerHTML = ticketPrice;
demandPercentageElement.innerHTML = demandPercentage;
peopleCountElement.innerHTML = peopleCount;



/* utility functions */

const setMoneyCount = (newMoneyCount) => {
    moneyCount = newMoneyCount;

    // disable/enable add train button
    if (moneyCount < trainCost) {
        btnAddTrainElement.disabled = true;
    } else {
        btnAddTrainElement.disabled = false;
    }

    // disable/enable add marketing button
    if (moneyCount < marketingCost) {
        btnAddMarketingElement.disabled = true;
    } else {
        btnAddMarketingElement.disabled = false;
    }

    moneyCountElement.innerHTML = moneyCount;
}


/* onclick functions */

const addTrain = () => {
    if (moneyCount >= trainCost) {
        // enable button
        btnAddTrainElement.disabled = false;
        // modify counts
        trainCount += 1;
        setMoneyCount(moneyCount - trainCost);
        // modify train cost
        trainCostFloat *= trainCostGrowthRate;
        trainCost = Math.floor(trainCostFloat);
        // set html
        trainCountElement.innerHTML = trainCount;
        trainCostElement.innerHTML = trainCost;
    }
}
btnAddTrainElement.onclick = addTrain;

const addMarketing = () => {
    if (moneyCount >= marketingCost) {
        // enable button
        btnAddMarketingElement.disabled = false;
        // modify counts
        marketingCount += 1;
        setMoneyCount(moneyCount - marketingCost);
        // modify marketing cost
        marketingCostFloat *= marketingCostGrowthRate;
        marketingCost = Math.floor(marketingCostFloat);
        // set html
        marketingCountElement.innerHTML = marketingCount;
        marketingCostElement.innerHTML = marketingCost;
    }
}
btnAddMarketingElement.onclick = addMarketing;

const increaseTicketPrice = () => {
    ticketPrice += 1;
    ticketPriceElement.innerHTML = ticketPrice;
    demandRate = ticketPriceStart / ticketPrice;
    demandPercentage = demandRate * 100.0;
    demandPercentageElement.innerHTML = Math.floor(demandPercentage);
}
btnIncreaseTicketPriceElement.onclick = increaseTicketPrice;

const decreaseTicketPrice = () => {
    if (ticketPrice > 1) {
        ticketPrice -= 1;
        ticketPriceElement.innerHTML = ticketPrice;
        demandRate = ticketPriceStart / ticketPrice;
        demandPercentage = demandRate * 100.0;
        demandPercentageElement.innerHTML = Math.floor(demandPercentage);
    }
}
btnDecreaseTicketPriceElement.onclick = decreaseTicketPrice;



/* looping/interval functions */

const addPeople = () => {
    // increase people count
    peopleCountChangeFloat = popGrowthRate + (marketingCount * marketingRate);
    peopleCountChange = Math.floor(peopleCountChangeFloat)
    peopleCount += peopleCountChange;
    // set html
    peopleCountElement.innerHTML = peopleCount;
}
setInterval(addPeople, defaultInterval);

const peopleTakeTrains = () => {
    if (peopleCount >= trainCount) {
        peopleCountChangeFloat = (trainCount * trainRate * demandRate);
        peopleCountChange = Math.floor(peopleCountChangeFloat);
        peopleCount -= peopleCountChange;
        setMoneyCount(moneyCount + (ticketPrice * peopleCountChange))
    }
}
setInterval(peopleTakeTrains, defaultInterval)