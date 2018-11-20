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

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var destinationName = $("#destination").val().trim();
  var startTrainTime = $("#firstTrainTime").val().trim();
  var trainFrequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding data
  var newTrain = {
    name: trainName,
    role: destinationName,
    start: startTrainTime,
    rate: trainFrequency
  };

  // Uploads to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.role);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
});




// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destinationName = childSnapshot.val().role;
  var startTrainTime = parseInt(childSnapshot.val().start);
  var trainFrequency = parseInt(childSnapshot.val().rate);

  console.log(trainName);
  console.log(destinationName);
  console.log(startTrainTime);
  console.log(trainFrequency);

  var convertStartTrainTime = moment(startTrainTime, "HHmm");

  var diffTime = moment().diff(moment(convertStartTrainTime), "minutes");

  var timeRemainder = diffTime % trainFrequency;

  var minutesAway = trainFrequency - timeRemainder;

  var nextArrival = moment().add(minutesAway, "minutes").format("HHmm");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destinationName),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});