/* ====================================================== */
/* ======================== MAIN ======================== */
/* ====================================================== */


// add train functionality to all cities
for (let i = 0; i < cities.length; i++) {

    cities[i]["addTrainsElement"].addEventListener('click', function(){
        addTrain(i);
    })

    cities[i]["sendTrainsElement"].addEventListener('click', function() {
        let destIndex = cities[i]["selectStationElement"].selectedIndex;

        if (destIndex >= i) {
            destIndex += 1; // offset by the source station
        }

        sendTrain(i, destIndex);
        checkButtons();
    })
}