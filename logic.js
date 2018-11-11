var config = {
    apiKey: "AIzaSyBZGzrTy0h0sLPnUJ8Omlp7VfeQD2rOS8Q",
    authDomain: "template-f35f6.firebaseapp.com",
    databaseURL: "https://template-f35f6.firebaseio.com",
    storageBucket: "template-f35f6.appspot.com"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#entry-submit").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var fisrtTrain = moment($("#first-train").val().trim(), "h:mm").format("X");
    var frequency = $("#frequency").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: destination,
      first: fisrtTrain,
      freq: frequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);
  
    alert("Train information successfully added");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var fisrtTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq;
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(fisrtTrain);
    console.log(frequency);
  
    // Prettify the employee start
    var firstPretty = moment.unix(fisrtTrain).format("h:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var minsAway = moment().diff(moment(fisrtTrain, "X"), "months");
    console.log(minsAway);
  
    // Calculate the total billed rate
    var empBilled = minsAway * frequency;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(firstPretty),
      $("<td>").text(frequency),
      $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });