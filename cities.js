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
        <button id="${city["name"]}AddTrain">Add train</button>
        <em>Cost: $<span id="${city["name"]}TrainCost"></span></em>
        <p>
            <button id="${city["name"]}SendTrain">Send train</button>
            <select id="${city["name"]}SelectStation"></select>
        </p>
        <p>
            Trains: <span id="${city["name"]}NumTrains"></span>
        </p>
    </div>`;
}