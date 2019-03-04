// INITIALIZE FIREBASE
var config = {
  apiKey: "AIzaSyDzAWv7MfqXc4JK8Kgk1SCcXfK0ugwM69k",
  authDomain: "choochoo-23480.firebaseapp.com",
  databaseURL: "https://choochoo-23480.firebaseio.com",
  projectId: "choochoo-23480",
  storageBucket: "choochoo-23480.appspot.com",
  messagingSenderId: "123918689074"
};
firebase.initializeApp(config);

var database = firebase.database();

// INITIAL VALUES
var trainName = "";
var trainDestination = "";
var trainTime = 0;
var trainFrequency = 0;


// CAPTURE BUTTON CLICK
$("#subClick").on("click", function (event) {
  // DON'T REFRESH THIS PAGE
  event.preventDefault();

  //STORE AND RETRIEVE INFORMATION FOR THE DATABASE
  var trainAdd = {
    trainName: $("#inputTrain").val().trim(),
    trainDestination: $("#inputDestination").val().trim(),
    trainTime: $("#inputTime").val().trim(),
    trainFrequency: $("#inputFrequency").val().trim()
  }
  //PUSH TRAIN DATA TO DATABASE
  database.ref().push(trainAdd);

  //INSERT MODAL HERE FOR TRAIN ADDED SUCCESSFULLY
  //CLEAR INPUT BOXES OF DATA ENTERED
  $("#inputTrain").val("");
  $("#inputDestination").val("");
  $("#inputTime").val("");
  $("#inputFrequency").val("");

});

//WATCH THE DATABASE FOR A CHANGE
database.ref().on("child_added", function (childSnapshot) {
  // console.log(childSnapshot.val());

  var trainName = childSnapshot.val().trainName;
  var trainDestination = childSnapshot.val().trainDestination;
  var trainTime = childSnapshot.val().trainTime;
  var trainFrequency = childSnapshot.val().trainFrequency;

  var firstTrainODconvert = moment(trainTime, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTrainODconvert), "minutes");
  var tRemainder = diffTime % trainFrequency;
  var tMinutesNextTrain = trainFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesNextTrain, "minutes");
  var nextTrainConverted = moment(nextTrain).format("hh:mm a");
  // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  $("#scheduler> tbody").append("<tr><td>" +
    trainName + "</td><td>" +
    trainDestination + "</td><td>" + "Every " +
    trainFrequency + " minutes" + "</td><td>" +
    nextTrainConverted + "</td><td>" +
    tMinutesNextTrain + "</td><td>" + "<button id=delete>" +  "</td></tr>");



  // REFLECT CHANGES IN HTML
  // $("#train-display").text(snapshot.val().trainName);
  // $("#destination-display").text(snapshot.val().trainDestination);
  // $("#time-display").text(snapshot.val().trainTime);
  // $("#frequency-display").text(snapshot.val().trainFrequency);

})