const express = require("express")
const cors = require("cors")
const database = require('./database')
const dbFunctions = require('./dbFunctions')
const { ObjectId } = require("mongodb")
const utils= require("./utils")
const atc= require('./address_to_coordinates')
const port = 3000

const app = express()
app.use(cors())
app.use(express.static("public"))
app.use(express.json())

// The route definitions for get, post and delete

app.get("/api/coordinates/param", async (req, res) => {
	try {
        let ris= utils(param);
        let lat= ris[0];
        let lon= ris[1];
		const docs = await dbFunctions.getCoordinates(lat, lon)
		console.log(docs)
        //res.json(docs) 
	}
	catch (err) {
		console.error("# Get Error", err)
		res.status(500).send({ error: err.name + ", " + err.message })
	}
})

app.get("/api/address/param", async (req, res) => {
	try {
        let ris= atc(param);
        let lat= ris[0];
        let lon= ris[1];
		const docs = await dbFunctions.getCoordinates(lat, lon)
		console.log(docs)
        //res.json(docs) 
	}
	catch (err) {
		console.error("# Get Error", err)
		res.status(500).send({ error: err.name + ", " + err.message })
	}
})

app.post('/api/addname', async (req, res) => {

	let data = req.body;

	try {
		data = await dbFunctions.addDoc(data)
		res.json(data)
	}
	catch (err) {
		console.error("# Post Error", err)
		res.status(500).send({ error: err.name + ", " + err.message })
	}
});



// Start the web server and connect to the database

let server
let conn

(async () => {
	try {
		conn = await database()
		await dbFunctions.getDb(conn)
		server = app.listen(port, () => {
			console.log("# App server listening on port " + port)
		})
	}
	catch(err) {
		console.error("# Error:", err)
		console.error("# Exiting the application.")
		await closing()
		process.exit(1)
	}
})()

async function closing() {
	console.log("# Closing resources...")
	if (conn) {
		await conn.close()
		console.log("# Database connection closed.")
	}
	if (server) {
		server.close(() => console.log("# Web server stopped."))
	}
}
