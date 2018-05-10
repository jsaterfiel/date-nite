
function fetchtripDetails(db, userId, callback) {
    db.collection("policeData").findOne({
        userId: userId
    }, function(err, results) {
        if (err) {
            console.log(err)
        } else {
            callback({
                userId: results.userId,
                restaurantId: results.restaurantId,
                location: results.location
            });
        }
    });
}

function saveRequest(db, userId, restaurantId, location,status,callback) {
    db.collection("requestsData").insert({
        "_id": userId,
        restaurantId: restaurantId,
        location: location

    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            callback(results);
        }
    });
}

function updateRequest(db, userId, restaurantId,location ,callback) {
    db.collection("requestsData").update({
        "_id": userId
    }, {
        $set: {
            restaurantId:restaurantId,
            location:location

        }
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            callback("request updated"); 
        }
    });
}

function fetchRequests(db, callback) {
    var collection = db.collection("requestsData");
    //Using stream to process lots of records
    var stream = collection.find({}, {
        requestTime: 1,
        status: 1,
        location: 1,
        _id: 0
    }).stream();

    var requestsData = [];

    stream.on("data", function(request) {
        requestsData.push(request);
    });
    stream.on('end', function() {
        callback(requestsData);
    });
}


exports.fetchtripDetails = fetchtripDetails;
exports.saveRequest = saveRequest;
exports.updateRequest = updateRequest;
exports.fetchRequests = fetchRequests;
