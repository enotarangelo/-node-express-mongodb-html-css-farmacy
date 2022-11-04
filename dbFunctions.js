const { ObjectId } = require("mongodb")
const dbName = "farmacy"
const coll = "farmacy"
let db

module.exports = {

	getDb: async (client) => {
		db = await client.db(dbName)
	},
    
	//restituisce la farmacia più vicina in base a longitudine e latitudine passate come parametri
	getCoordinates: async (lon, lat) => {
		return await db.collection(coll).find({ "geometry.coordinates": { $near: { $geometry: { type: "Point" , coordinates: [lon ,  lat]}}}}).toArray()
	}
	
}

