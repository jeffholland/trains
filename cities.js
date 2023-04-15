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
        "name": "Columbus",
        "x": 75,
        "y": 70,
        "population": 906500
    },
    {
        "name": "Indianapolis",
        "x": 70,
        "y": 68,
        "population": 882000
    },
    {
        "name": "Chicago",
        "x": 65,
        "y": 80,
        "population": 2750000
    },
    {
        "name": "Charlotte",
        "x": 78,
        "y": 35,
        "population": 879700
    },
    {
        "name": "Jacksonville",
        "x": 75,
        "y": 11,
        "population": 954600
    },
    {
        "name": "Denver",
        "x": 30,
        "y": 60,
        "population": 711500
    },
    {
        "name": "Oklahoma City",
        "x": 52,
        "y": 30
    },
    {
        "name": "Dallas",
        "x": 52,
        "y": 16,
        "population": 1288000
    },
    {
        "name": "Houston",
        "x": 55,
        "y": 11,
        "population": 2300000
    },
    {
        "name": "San Antonio",
        "x": 50,
        "y": 10,
        "population": 1450000
    },
    {
        "name": "Austin",
        "x": 51,
        "y": 12,
        "population": 964200
    },
    {
        "name": "Phoenix",
        "x": 15,
        "y": 10,
        "population": 1625000
    },
    {
        "name": "San Diego",
        "x": 6,
        "y": 12,
        "population": 1382000
    },
    {
        "name": "Los Angeles",
        "x": 5,
        "y": 15,
        "population": 3900000
    },
    {
        "name": "San Jose",
        "x": 1,
        "y": 36,
        "population": 983500
    },
    {
        "name": "San Francisco",
        "x": 0,
        "y": 40,
        "population": 815200
    },
    {
        "name": "Seattle",
        "x": 2,
        "y": 100,
        "population": 733900
    }
];


const createCity = (city) => {
    return `
    <div class="border-box">
        <h2>${city["name"]}</h2>
        <p>
            <button id="${city["name"]}AddTrain">Add train</button>
            <em><strong>Cost:</strong> $<span id="${city["name"]}TrainCost"></span></em>
        </p>
        <p>
            <button id="${city["name"]}SendTrain">Send train</button>
            <select id="${city["name"]}SelectStation"></select>
            <input id="${city["name"]}SendTrainTime" type="time" value="00:00" />
        </p>
        <p>
            <strong>Ticket price:</strong> $<span id="${city["name"]}TicketPrice">5</span>
            <button id="${city["name"]}IncreaseTicketPrice">+</button>
            <button id="${city["name"]}DecreaseTicketPrice">-</button>
        </p>
        <p>
            <strong>Demand:</strong> <span id="${city["name"]}Demand">100</span>%
        </p>
        <p>
            <strong>Trains:</strong> <span id="${city["name"]}NumTrains"></span>
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

    cities[i]["addTrainsElement"] = document.getElementById(cities[i]["name"] + "AddTrain");

    cities[i]["sendTrainsElement"] = document.getElementById(cities[i]["name"] + "SendTrain");
    cities[i]["selectStationElement"] = document.getElementById(cities[i]["name"] + "SelectStation");
    cities[i]["sendTrainTimeElement"] = document.getElementById(cities[i]["name"] + "SendTrainTime");

    cities[i]["ticketPrice"] = 5;
    cities[i]["ticketPriceElement"] = document.getElementById(cities[i]["name"] + "TicketPrice");
    cities[i]["increaseTicketPriceElement"] = document.getElementById(cities[i]["name"] + "IncreaseTicketPrice");
    cities[i]["decreaseTicketPriceElement"] = document.getElementById(cities[i]["name"] + "DecreaseTicketPrice");

    cities[i]["demand"] = 100;
    cities[i]["demandElement"] = document.getElementById(cities[i]["name"] + "Demand");

    cities[i]["increaseTicketPriceElement"].onclick = function() {
        cities[i]["ticketPrice"]++;
        cities[i]["ticketPriceElement"].innerHTML = cities[i]["ticketPrice"];
        cities[i]["demand"] = calculateDemand(cities[i]["ticketPrice"]);
        cities[i]["demandElement"].innerHTML = cities[i]["demand"];
    }
    cities[i]["decreaseTicketPriceElement"].onclick = function() {
        cities[i]["ticketPrice"]--;
        cities[i]["ticketPriceElement"].innerHTML = cities[i]["ticketPrice"];
        cities[i]["demand"] = calculateDemand(cities[i]["ticketPrice"]);
        cities[i]["demandElement"].innerHTML = cities[i]["demand"];
    }

    cities[i]["numTrains"] = 0;
    cities[i]["numTrainsElement"] = document.getElementById(cities[i]["name"] + "NumTrains");
    cities[i]["numTrainsElement"].innerHTML = cities[i]["numTrains"];
}