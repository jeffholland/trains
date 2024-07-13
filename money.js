/* ======================================================= */
/* ======================== MONEY ======================== */
/* ======================================================= */

let fundsAvailable = 20000;
const fundsAvailableElement = document.getElementById("fundsAvailable")
fundsAvailableElement.innerHTML = fundsAvailable;

const checkButtons = () => {

    // Disable buttons if there's not enough money,
    // enable them if there is.

    const nextCityCost = parseInt(document.getElementById("nextCityCost").innerHTML);
    document.getElementById("addNextCity").disabled = nextCityCost > fundsAvailable;

    for (let i = 0; i < cities.length; i++) {
        cities[i]["addTrainsElement"].disabled = cities[i]["trainCost"] > fundsAvailable;
        cities[i]["sendTrainsElement"].disabled = cities[i]["numTrains"] <= 0 || cities[i]["selectStationElement"].options.length <= 0;
    }
}

const addMoney = (amountToAdd) => {
    fundsAvailable += amountToAdd;
    fundsAvailableElement.innerHTML = fundsAvailable;
    checkButtons();
} 

const subtractMoney = (amountToSubtract) => {
    if (fundsAvailable > amountToSubtract) {
        fundsAvailable -= amountToSubtract;
        fundsAvailableElement.innerHTML = fundsAvailable;
        checkButtons();
    } else {
        throw new Error("insufficient funds!");
    }
}