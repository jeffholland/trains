let fundsAvailable = 20000;
const fundsAvailableElement = document.getElementById("fundsAvailable")
fundsAvailableElement.innerHTML = fundsAvailable;

const addMoney = (amountToAdd) => {
    fundsAvailable += amountToAdd;
    fundsAvailableElement.innerHTML = fundsAvailable;
} 

const subtractMoney = (amountToSubtract) => {
    fundsAvailable -= amountToSubtract;
    fundsAvailableElement.innerHTML = fundsAvailable;
}