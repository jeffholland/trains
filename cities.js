const leftColumnElement = document.getElementById("left-column");

const cities = [
    {
        "name": "New York",
        "x": 90,
        "y": 75,
        "population": 8800000
    },
    {
        "name": "Boston",
        "x": 100,
        "y": 90,
        "population": 654800
    },
    {
        "name": "Philadelphia",
        "x": 85,
        "y": 70,
        "population": 1600000
    },
    {
        "name": "Buffalo",
        "x": 81,
        "y": 91,
        "population": 276807
    },
    {
        "name": "Baltimore",
        "x": 83,
        "y": 66,
        "population": 576498
    },
    {
        "name": "Washington DC",
        "x": 82,
        "y": 65,
        "population": 670000
    },
    {
        "name": "Richmond",
        "x": 81,
        "y": 62,
        "population": 226604
    },
    {
        "name": "Charlotte",
        "x": 78,
        "y": 35,
        "population": 879700
    },
    {
        "name": "Atlanta",
        "x": 72,
        "y": 32,
        "population": 496461
    },
    {
        "name": "Jacksonville",
        "x": 75,
        "y": 11,
        "population": 954600
    },
    {
        "name": "Miami",
        "x": 80,
        "y": 0,
        "population": 439890
    },
    {
        "name": "Pittsburgh",
        "x": 80,
        "y": 75,
        "population": 300431
    },
    {
        "name": "Cleveland",
        "x": 78,
        "y": 78,
        "population": 368000
    },
    {
        "name": "Columbus",
        "x": 75,
        "y": 70,
        "population": 906500
    },
    {
        "name": "Detroit",
        "x": 75,
        "y": 80,
        "population": 632500
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
        "name": "Milwaukee",
        "x": 65,
        "y": 82,
        "population": 569330
    },
    {
        "name": "Minneapolis",
        "x": 57,
        "y": 88,
        "population": 425336
    },
    {
        "name": "Louisville",
        "x": 71,
        "y": 65,
        "population": 628594
    },
    {
        "name": "Nashville",
        "x": 70,
        "y": 40,
        "population": 678900
    },
    {
        "name": "Memphis",
        "x": 60,
        "y": 35,
        "population": 628127
    },
    {
        "name": "St. Louis",
        "x": 60,
        "y": 66,
        "population": 293310
    },
    {
        "name": "Kansas City",
        "x": 56,
        "y": 65,
        "population": 508394
    },
    {
        "name": "Wichita",
        "x": 53,
        "y": 40,
        "population": 395699
    },
    {
        "name": "Oklahoma City",
        "x": 52,
        "y": 30,
        "population": 687725
    },
    {
        "name": "Omaha",
        "x": 54,
        "y": 70,
        "population": 487300
    },
    {
        "name": "Denver",
        "x": 30,
        "y": 65,
        "population": 711500
    },
    {
        "name": "New Orleans",
        "x": 65,
        "y": 10,
        "population": 376971
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
        "name": "Austin",
        "x": 51,
        "y": 12,
        "population": 964200
    },
    {
        "name": "San Antonio",
        "x": 50,
        "y": 10,
        "population": 1450000
    },
    {
        "name": "Albuquerque",
        "x": 28,
        "y": 16,
        "population": 562599
    },
    {
        "name": "Phoenix",
        "x": 15,
        "y": 14,
        "population": 1625000
    },
    {
        "name": "Tucson",
        "x": 16,
        "y": 10,
        "population": 543242
    },
    {
        "name": "Las Vegas",
        "x": 10,
        "y": 32,
        "population": 646800
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
        "name": "Sacramento",
        "x": 2,
        "y": 45,
        "population": 525041
    },
    {
        "name": "Boise",
        "x": 9,
        "y": 85,
        "population": 237446
    },
    {
        "name": "Portland",
        "x": 0,
        "y": 90,
        "population": 641200
    },
    {
        "name": "Spokane",
        "x": 8,
        "y": 100,
        "population": 229071
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
        if (cities[i]["ticketPrice"] > 1) {
            cities[i]["ticketPrice"]--;
            cities[i]["ticketPriceElement"].innerHTML = cities[i]["ticketPrice"];
            cities[i]["demand"] = calculateDemand(cities[i]["ticketPrice"]);
            cities[i]["demandElement"].innerHTML = cities[i]["demand"];
        }
    }

    cities[i]["numTrains"] = 0;
    cities[i]["numTrainsElement"] = document.getElementById(cities[i]["name"] + "NumTrains");
    cities[i]["numTrainsElement"].innerHTML = cities[i]["numTrains"];
}