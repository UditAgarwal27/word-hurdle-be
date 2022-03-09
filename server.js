const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const csvtojson = require('csvtojson')
const wordsModel = require('./Models/word');
const multer = require('multer');
const upload = multer({dest:"uploads/"}).single("wordsCSV");
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());



//Routes handler
const userRoute = require('./Routes/user.js');
const wordRoute = require('./Routes/word');
const leaderboardRoute = require('./Routes/leaderboard');
app.use('/auth', userRoute);
app.use('/auth', userRoute);
app.use('/auth', userRoute);
app.use('/word', wordRoute)
app.use('/leaderboard', leaderboardRoute);


//upload csv file to database;
app.post('/uploadCSV', (req, res)=>{
  upload(req, res, (err)=>{
    if(err) {
      res.status(400).json({err:err});
    }
    csvtojson()
    .fromFile(req.file.path)
    .then(async(csvData)=>{
      await wordsModel.deleteOne();
      const newwords = new wordsModel({
        words:csvData
      })
      await newwords.save();
      fs.unlinkSync(req.file.path);
      res.status(200).json("File successfully updated");
    })
  })  
})

app.get("/login", async(req, res)=>{
    console.log("the first time fetching access token  is send here : ", req.body);
})

const port = process.env.PORT || 5001;
// const connectParamas = {
//     newUrlParser:true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`)
    mongoose.connect(process.env.mongo_uri_local, (err)=>{
        if(err) return "Failed to connected to DB";
        console.log("Connected to DB");
    })
})



