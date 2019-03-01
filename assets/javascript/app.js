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
    var trainFrequency = 0



