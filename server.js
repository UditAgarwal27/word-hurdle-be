const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


//ROUTES HANDLER
const wordRoute = require('./Routes/word');
const scoreRoute = require('./Routes/score');
//ROUTES AS MIDDLEWARE
app.use('/word', wordRoute)
app.use('/score', scoreRoute);

//CRON JOBS
const reset_score_cron = require('./Services/cron_jobs');
reset_score_cron.start();

//STARTING THE SERVER
const port = process.env.PORT || 5001;
app.listen(port, () => {
	console.log(`Listening at port ${port}`)
	mongoose.connect(process.env.mongo_url, (err) => {
		if (err) return "Failed to connected to DB";
		console.log("Connected to DB");
	})
})



