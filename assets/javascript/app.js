//https://train-scheduler-f028b.firebaseio.com/

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDxSChiR1dcNQXjr6kQc-A1RnxkaAVTpt4",
    authDomain: "train-scheduler-f028b.firebaseapp.com",
    databaseURL: "https://train-scheduler-f028b.firebaseio.com",
    storageBucket: "train-scheduler-f028b.appspot.com",
    messagingSenderId: "858892540684"
  };
  firebase.initializeApp(config);

  
    // Get a reference to the database service
    var database = firebase.database()

    $("#addTrain").on("click",function(){
	database.ref().push({
		trainName: $("#train-name").val().trim(), //add the train to db
		trainDestination: $("#destination").val().trim(), //add the destination to db
		trainDepartureTime: moment($("#first-train-time").val().trim(), "HH:mm").format("HH:mm"), // add the departure time to db
		trainFrequency: Number($("#frequency").val().trim()) //add the frequencey to db
	});
});

database.ref().on("child_added", function(childSnapshot,prevChildKey){
	console.log(childSnapshot.val()); 

	var trName = childSnapshot.val().trainName;
	var trDestination = childSnapshot.val().trainDestination;
	var trDeparture = childSnapshot.val().trainDepartureTime;
	var trFrequency = childSnapshot.val().trainFrequency;

	//Test Assumptions
    var trFrequency = 3;

    //Test Time is 3:30 AM
    var firstTime = "03:30";

    //First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    //Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    //$("#currentTime").html("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    //Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    //$("#diffinTime").html("DIFFERENCE IN TIME: " + diffTime);

    //Time apart (remainder)
    var trRemainder = diffTime % trFrequency;
    console.log(trRemainder);

    //Minute Until Train
    var trMinutesTillTrain = trFrequency - trRemainder;
    console.log("MINUTES TILL TRAIN: " + trMinutesTillTrain);
    //$("#minsTillTrain").html("MINUTES TILL TRAIN: " + trMinutesTillTrain);

    //Next Train
    var nextTrain = moment().add(trMinutesTillTrain, "minutes");
    console.log("ARRIVAL : " + moment(nextTrain).format("HH:mm"));
    //$("#next-train").html("Next Train : " + moment(nextTrain).format("HH:mm"));

	//Add new train input into the table 
	var newTrainInfo = $("<tr>") 
		.append($("<td>").html(trName))
		.append($("<td>").html(trDestination))
		.append($("<td>").html(trFrequency))
		.append($("<td>").html(nextTrain))
		.append($("<td>").html(trMinsTillTrain));
	$("#train-table").append(newTrainInfo);
});


