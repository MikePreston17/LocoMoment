window.onload = init;

function init() {

    $('#submit').on('click', event => {

        let train = {
            name: $('#train-name').val().trim(),
            destination: $('#destination').val().trim(),
            startTime: $('#start-time').val().trim(),
            frequency: $('#frequency').val().trim(),
        };
        console.log('choo choo: ', train);

        if (!train || !train.name)
            train = {
                name: "James",
                destination: "NJ",
                frequency: 3,
                startTime: "03:30",
            } //todo :remove before prod

        addTrain(train);
    })

    trains.on('child_added', train => {
        console.log(train.val());

        const {
            name,
            destination,
            startTime,
            frequency,
            minutesAway,
            nextArrival,
        } = calculate(train);

        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(minutesAway),
            $("<td>").text(nextArrival)
        );

        $("#train-table > tbody").append(newRow);
    })

}

const addTrain = (train) => {
    trains.push(train);
}

//name, destination, first time (military), frequency (min), minutes away.
// should be relative to current time
const calculate = (train) => {

    const {
        name,
        destination,
        startTime,
        frequency,
    } = train;

    train.nextArrival = "00:00";
    train.minutesAway = 0;

    return train;
}



// Bonus
// update times every minute.