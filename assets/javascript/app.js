// Initialize Firebase
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

    // Initial Values
    var trainName = "";
    var trainDestination = "";
    var trainTime = 0;
    var trainFrequency = 0;


    // Capture Button Click
    $("#subClick").on("click", function(event) {
      // Don't refresh the page!
      event.preventDefault();

      //Store and retrieve information to database
      trainName = $("#inputTrain").val().trim();
      trainDestination = $("#inputDestination").val().trim();
      trainTime = $("#inputTime").val().trim();
      trainFrequency = $("#inputFrequency").val().trim();

      database.ref().set({
        trainName: trainName,
        trainDestination: trainDestination,
        trainTime: trainTime,
        trainFrequency: trainFrequency
      });

    });

    database.ref().on("value", function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().trainDestination);
      console.log(snapshot.val().trainTime);
      console.log(snapshot.val().trainFrequency);
    
          // Change the HTML to reflect
          $("#inputTrain").text(snapshot.val().trainName);
          $("#inputDestination").text(snapshot.val().trainDestination);
          $("#inputTime").text(snapshot.val().trainTime);
          $("#inputFrequency").text(snapshot.val().trainFrequency);
    
    })

