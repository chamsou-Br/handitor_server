// Requiring module
const express = require('express');
const mongoose = require("mongoose")
const cors = require("cors");
const UserRouter = require('./Routers/UserRoute');
const EtablissementRouter = require('./Routers/EtablissementRoute');
const ReservationRouter = require("./Routers/ReservationRoute"); 
const ConventionRouter = require('./Routers/ConventionRoute');
const SlideRouter = require('./Routers/SlideRoute');
const AuthController = require("./Controllers/AuthController")
const UserController = require("./Controllers/UserController")
 
// Creating express object
const app = express();
app.use(express.urlencoded({extended : true}))
app.use(express.json({limit: '50mb'}));
 


// Port Number
const PORT = process.env.PORT ||5000;
 
// Server Setup
app.use(cors());

app.listen(PORT,console.log(
  `Server started on port ${PORT}`));

  // connect Database
mongoose.connect("mongodb://localhost:27017/Handitor",{useUnifiedTopology : true , useNewUrlParser : true});
mongoose.connection.once('open',()=> {
    console.log("dataBase is related sucessfully");
})

app.post('/register3' ,(req, res) => {
    console.log(req.body,req.file ? req.file : "no file")
    res.send('A simple Node App is '
        + 'running on this server')
    res.end()
})

// Handling GET request
app.get('/',AuthController.checkToken ,(req, res) => {
    console.log(req.headers.authorization)
    res.send('A simple Node App is '
        + 'running on this server')
    res.end()
})

//Routers 
app.use("/Auth",UserRouter);
app.use('/Etablissement',EtablissementRouter)
app.use("/Reservation",ReservationRouter)
app.use("/Convention" , ConventionRouter)
app.use("/Slide",SlideRouter)
