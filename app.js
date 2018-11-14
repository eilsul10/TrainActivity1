// Firebase application to store real time database information
// Initialize Firebase -- set from false to true in app
var config = {
    apiKey: "AIzaSyAJbgIoZsAO5asmIpAB4EQIR2wH4DQtfyc",
    authDomain: "triviagame-ba643.firebaseapp.com",
    databaseURL: "https://triviagame-ba643.firebaseio.com",
    projectId: "triviagame-ba643",
    storageBucket: "triviagame-ba643.appspot.com",
    messagingSenderId: "227891755490"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Moment.js app
// Intial values
// Capture button click
// Child added function in order to append table rows

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var destinationName = $("#destination").val().trim();
  var startTrainTime = moment($("firstTrainTime").val().trim(), "MM/DD/YYYY").format("X");
  var trainFrequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    role: destinationName,
    start: startTrainTime,
    rate: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.role);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("Train successfully added");



// Above has been vetted w/ entire code





  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destinationName = childSnapshot.val().role;
  var startTrainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(destinationName);
  console.log(startTrainTime);
  console.log(trainFrequency);

  // Prettify the employee start
  var empStartPretty = moment.unix(startTrainTime).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(startTrainTime, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * trainFrequency;
  console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destinationName),
    $("<td>").text(empStartPretty),
    $("<td>").text(empMonths),
    $("<td>").text(trainFrequency),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});