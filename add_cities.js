/* ============================================================ */
/* ======================== ADD CITIES ======================== */
/* ============================================================ */

const nextCityNameElement = document.getElementById("nextCityName");
const nextCityCostElement = document.getElementById("nextCityCost");
const addNextCityElement = document.getElementById("addNextCity");

let nextCityIndex = 0;
let nextCityCost;

const setNextCity = () => {
    nextCityNameElement.innerHTML = cities[nextCityIndex]["name"];
    nextCityCost = Math.floor(cities[nextCityIndex]["population"] / 500);
    nextCityCostElement.innerHTML = nextCityCost;
}
setNextCity();

const setCityOptions = (i) => {
    // Clear options
    cities[i]["selectStationElement"].options.length = 0;

    for (let j = 0; j < cities.length; j++) {
        // For each city that is not the current city
        if (j != i && cities[j]["cityElement"].style.visibility == "visible") {
            const stationOptionElement = cities[i]["selectStationElement"].appendChild(
                document.createElement("option")
            )
            stationOptionElement.innerHTML = cities[j]["name"];
        }
    }
}

addNextCityElement.onclick = function() {
    try {
        subtractMoney(nextCityCost);
    } catch (e) {
        console.error(e);
        return;
    }
    cities[nextCityIndex]["cityElement"].style.visibility = "visible";

    let i = nextCityIndex;
    while (i >= 0) {
        setCityOptions(i);
        i--;
    }

    nextCityIndex++;
    setNextCity();
    checkButtons();
};