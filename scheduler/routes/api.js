const express = require("express");
const app = express();
const redisConnection = require("../redis-connection");
const router = express.Router();
const uber = require('node-uber');
var dbOperations = require('./dbOperations');


router.get("",async(req,res) =>{
  try {
      let response = await nrpSender.sendMessage({
          redis: redisConnection,
          eventName: "getUserProfile",
          data: {
              message: req.params.id
          },
          Requests.prototype.create();
      });
      res.json(response);
  } catch (e) {
      res.json({ error: e.message });


});


router.get("/v1.2/requests/estimate",async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "getRestaurantId",
            data: {
                message: req.params.restaurantId
            }
        });
        res.json(response);
    } catch (e) {
        res.json({ error: e.message });



});


router.post("/v1.2/requests/estimate",async (req, res) => {
    // try {
    //     let response = await nrpSender.sendMessage({
    //         redis: redisConnection,
    //         eventName: "deletePeople",
    //         data: {
    //             message: req.params.id
    //         }
    //     });
    //     res.json(response);
    // } catch (e) {
    //     res.json({ error: e });
    // }

    Estimates.prototype.getETAForLocation = function getETAForLocation(lat, lon, id, callback) {
        if (typeof id === 'function') {
            callback = id;
            id = undefined;
        }

        if (!lat || !lon) {
            return callback(new Error('Invalid latitude & longitude'));
        }

        // add optional product_id in case it's set
        var par = (id && id !== '') ? {
            start_latitude: lat,
            start_longitude: lon,
            product_id: id
        } : {
            start_latitude: lat,
            start_longitude: lon
        };

        return this._uber.get({
            url: this.path + '/time',
            params: par,
            server_token: true
        }, callback);
    };


});


function initialize(app, db, socket ,io) {



    // '/cops/info?userId=01'
    app.get('/cops/info', function(req, res) {
        var userId = req.query.userId //extract userId from quert params
        dbOperations.fetchtripDetails(db, userId, function(results) {
            res.json({
                tripDetails: result
            });
        });
    });

    //Listen to a 'request-for-help' event from connected citizens
    socket.on('trip-request', function(eventData) {


        var requestTime = new Date(); //Time of the request

        var ObjectID = require('mongodb').ObjectID;
        var requestId = new ObjectID; //Generate unique ID for the request

        //1. First save the request details inside a table requestsData.
        //Convert latitude and longitude to [longitude, latitude]
        var location = {
            coordinates: [
                eventData.location.longitude,
                eventData.location.latitude
            ],
            address: eventData.location.address
        };
        dbOperations.saveRequest(db, userId, restaurantId, location,status,callback, function(results) {
          res.json({
              tripDetails: result
          });
        });

    });

    //Fetch all requests
    app.get('/requests/info', function(req, res) {
        dbOperations.fetchRequests(db, function(results) {
            var features = [];
            for (var i = 0; i < results.length; i++) {
                features.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: results[i].location.coordinates
                    },
                    properties: {
                        status: results[i].status,
                        requestTime: results[i].requestTime,
                        address: results[i].location.address
                    }
                })
            }

        });
    });

}

exports.initialize = initialize;

module.exports = router;
