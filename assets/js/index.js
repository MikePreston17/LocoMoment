window.onload = init;

function init() {

    $('#submit').on('click', event => {

        let protoTrain = {
            name: "James",
            destination: "NJ",
            frequency: 3,
            startTime: "03:30",
        } //todo :remove before prod

        let train = {
            name: $('#train-name').val().trim(),
            destination: $('#destination').val().trim(),
            startTime: $('#start-time').val().trim(),
            frequency: $('#frequency').val().trim(),
        };

        if (isNullOrEmpty(train)) {
            alert('all fields must be filled.');
            return;
        }
        //     // Object.assign(protoTrain, train); //todo: remove b4 prod
        //     train = protoTrain;

        addTrain(train);
    })

    trains.on('child_added', snap => {

        let train = snap.val();

        const {
            name,
            destination,
            startTime, //I really don't know why the directions wanted this, but here it is...
            frequency,
            minutesAway,
            nextArrival,
        } = calculate(train);

        console.table([{
            name,
            destination,
            startTime,
            frequency,
            minutesAway,
            nextArrival
        }])

        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesAway),
        );

        $("#train-table > tbody").append(newRow);
    })

}

const addTrain = (train) => {
    trains.push(train);
}

// name, destination, first time (military), frequency (min), minutes away.
// should be relative to current time
const calculate = (train) => {

    const {
        startTime,
        frequency,
    } = train;

    var currentTime = moment().format("HH:mm");

    console.log({
        startTime,
        currentTime
    });

    let currentTimeConverted = moment(currentTime, "HH:mm").subtract(1, "years");

    console.log("CURRENT TIME: " + currentTimeConverted);

    let diffTime = moment().diff(moment(currentTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    let timeApart = diffTime % frequency;
    console.log("TIME APART: ", timeApart);

    let minutesTill = frequency - timeApart;
    console.log("MINUTES TILL TRAIN: " + minutesTill);

    var nextTrain = moment().add(minutesTill, "minutes");
    let arrival = moment(nextTrain).format("HH:mm");
    console.log("ARRIVAL TIME: " + arrival);

    train.nextArrival = arrival;
    train.minutesAway = minutesTill;

    return train;
}