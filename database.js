/**var ris;

module.exports = function responseMongoDB(lon, lat){
    //MONGODB Connection and find 
    var MongoClient = require('mongodb').MongoClient;
    var Promise = require("promise");
    var url = "mongodb://localhost:27017/farmacy";


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("farmacy");
        dbo.collection("farmacy").find({ "geometry.coordinates": { $near: { $geometry: { type: "Point" , coordinates: [lon ,  lat]}}}}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result[0].properties.DENOM_FARMACIA);
          //console.log(result[0].properties.INDIRIZZO);
          ris= result[0]
    
          db.close();
        });
    });
    return ris
}

console.log(responseMongoDB(45.459839, 9.147159), console.log())*/


const { MongoClient } = require("mongodb")
const uri = "mongodb://localhost:27017/"
const opts = { useUnifiedTopology: true }

const connect = async () => {
	try {
		console.log("# Connecting to database server...")
		const client = await MongoClient.connect(uri, opts)
		console.log("# Connected")
		return client
	}
	catch(err) {
		console.error("# Database connection error")
		throw err
	}
}

module.exports = connect;

