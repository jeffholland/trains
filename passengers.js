const getPassengerIncrement = (sourceIndex, destIndex) => {
    // todo - make it depend on source and dest city populations
    // and other variables...
    let increment = 0;

    const sourcePopInc = cities[sourceIndex]["population"] / 100000000;
    const destPopInc = cities[destIndex]["population"] / 100000000;

    increment += sourcePopInc * Math.random();
    increment += destPopInc * Math.random();

    increment *= secondInterval;

    return increment;
}