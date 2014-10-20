//http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
// server.js

// ==================================================================================================
// SERVER SETUP
// Need to reference the package that we are going to use to simplify the creation of the server and
// store the reference in the express variable
// ==================================================================================================

	var express 	= require('express');
	var cors 		= require('cors');
	var modifiers 	= require('./modifiers');
	var api 		= express();			// Need to call to generate the API server

	var port = 8080;

// ==================================================================================================
// API ROUTES
// This is where we declare the URLs (e.g. http://localhost:8080/api) and tell the server what action
// that we want the server to do for each URL
// ==================================================================================================

	var router = express.Router();

	router.get('/', function(req, res) {
		res.json({message: 'Welcome to the Car Insurance API.  Provide the correct URL and JSON to calculate the rates'});
	});

	router.post('/calculateRates', function(req, res) {
		// This is the JSON object that we passed as a parameter.  Values can be accessed by model.ValueName
		// i.e. model.age

		var model = req.query;

		// Setup basic values
		var basePrice = 500;
		
		// Call each of our built functions to get the specific modifier needed to make the calculation
		var totalCost = basePrice * modifiers.Personal(model.age, model.gender);

		// Return the calculated value as a JSON object
		res.json({ result: totalCost });
	});

	// More routes can be added here

	// REGISTER ROUTES FOR API
	// We have declared the actions that we want to see when we access a certain URL above, but we must
	// update the server with the new routes as well
	api.use(cors());
	api.use('/api', router);
	
// ==================================================================================================
// START SERVER
// Now that we have told the server what actions to take we must start the server so that it can 
// recieve incoming requests using the URLs and log to the server user that it has started
// ==================================================================================================
api.listen(port);
console.log('The server is now running and can be accessed at http://localhost:8080/api');
