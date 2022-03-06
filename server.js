const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());



//Routes handler
const userRoute = require('./Routes/user.js');
const wordRoute = require('./Routes/word');
app.use('/auth', userRoute);
app.use('/auth', userRoute);
app.use('/auth', userRoute);
app.use('/word', wordRoute)

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



