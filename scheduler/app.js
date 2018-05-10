const express = require("express");
let app = express();
let configRoutes = require("./routes");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:5000");
});

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'tripDb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});


http.createServer(app).listen(portNumber, function(){ //creating the server which is listening to the port number:8000, and calls a function within in which calls the initialize(app) function in the router module
	console.log('Server listening at port '+ portNumber);

	mongoClient.connect(url, function(err, db) { //a connection with the mongodb is established here.
		console.log("Connected to Database");
		routes.initialize(app, db); //function defined in routes.js which is exported to be accessed by other modules
	});
});
