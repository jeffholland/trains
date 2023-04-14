const leftColumnElement = document.getElementById("left-column");

const cities = [
    {
        "name": "New York",
        "x": 90,
        "y": 75,
        "population": 8800000
    },
    {
        "name": "Philadelphia",
        "x": 85,
        "y": 70,
        "population": 1600000
    },
    {
        "name": "Chicago",
        "x": 70,
        "y": 80,
        "population": 2750000
    },
    {
        "name": "Houston",
        "x": 50,
        "y": 5,
        "population": 2300000
    },
    {
        "name": "Los Angeles",
        "x": 5,
        "y": 10,
        "population": 3900000
    }
];


const createCity = (city) => {
    return `
    <div class="border-box">
        <h2>${city["name"]}</h2>
        <p>
            <button id="${city["name"]}AddTrain">Add train</button>
            <em>Cost: $<span id="${city["name"]}TrainCost"></span></em>
        </p>
        <p>
            <em>Population: <span id="${city["name"]}Population"></span></em>
        </p>
        <p>
            <button id="${city["name"]}SendTrain">Send train</button>
            <select id="${city["name"]}SelectStation"></select>
            <input id="${city["name"]}SendTrainTime" type="time" value="00:00" />
        </p>
        <p>
            Ticket price: $<span id="${city["name"]}TicketPrice">5</span>
            <button id="${city["name"]}IncreaseTicketPrice">+</button>
            <button id="${city["name"]}DecreaseTicketPrice">-</button>
        </p>
        <p>
            Trains: <span id="${city["name"]}NumTrains"></span>
        </p>
    </div>`;
}



// create cities
let text = "";

for (let i = 0; i < cities.length; i++) {
    text += createCity(cities[i])
}
leftColumnElement.innerHTML = text;



// fill cities with info

for (let i = 0; i < cities.length; i++) {

    cities[i]["trainCost"] = 1000;
    cities[i]["trainCostElement"] = document.getElementById(cities[i]["name"] + "TrainCost")
    cities[i]["trainCostElement"].innerHTML = cities[i]["trainCost"];

    cities[i]["populationElement"] = document.getElementById(cities[i]["name"] + "Population")
    cities[i]["populationElement"].innerHTML = cities[i]["population"];

    cities[i]["addTrainsElement"] = document.getElementById(cities[i]["name"] + "AddTrain");

    cities[i]["sendTrainsElement"] = document.getElementById(cities[i]["name"] + "SendTrain");
    cities[i]["selectStationElement"] = document.getElementById(cities[i]["name"] + "SelectStation");
    cities[i]["sendTrainTimeElement"] = document.getElementById(cities[i]["name"] + "SendTrainTime");

    cities[i]["ticketPrice"] = 5;
    cities[i]["ticketPriceElement"] = document.getElementById(cities[i]["name"] + "TicketPrice");
    cities[i]["increaseTicketPriceElement"] = document.getElementById(cities[i]["name"] + "IncreaseTicketPrice");
    cities[i]["decreaseTicketPriceElement"] = document.getElementById(cities[i]["name"] + "DecreaseTicketPrice");

    cities[i]["increaseTicketPriceElement"].onclick = function() {
        cities[i]["ticketPrice"]++;
        cities[i]["ticketPriceElement"].innerHTML = cities[i]["ticketPrice"];
    }
    cities[i]["decreaseTicketPriceElement"].onclick = function() {
        cities[i]["ticketPrice"]--;
        cities[i]["ticketPriceElement"].innerHTML = cities[i]["ticketPrice"];
    }

    cities[i]["numTrains"] = 0;
    cities[i]["numTrainsElement"] = document.getElementById(cities[i]["name"] + "NumTrains");
    cities[i]["numTrainsElement"].innerHTML = cities[i]["numTrains"];
}