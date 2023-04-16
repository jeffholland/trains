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

addNextCityElement.onclick = function() {
    try {
        subtractMoney(nextCityCost);
    } catch (e) {
        console.error(e);
        return;
    }
    const cityElement = document.getElementById(cities[nextCityIndex]["name"])
    cityElement.style.visibility = "visible";
    nextCityIndex++;
    setNextCity();
};