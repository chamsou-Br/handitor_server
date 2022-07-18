// Requiring module
const express = require('express');
const mongoose = require("mongoose")
const cors = require("cors");
const UserRouter = require('./Routers/UserRoute');
const EtablissementRouter = require('./Routers/EtablissementRoute');
const multer = require("multer");
 
// Creating express object
const app = express();
 


// Port Number
const PORT = process.env.PORT ||5000;
 
// Server Setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));

  // connect Database
mongoose.connect("mongodb://localhost:27017/Handitor",{useUnifiedTopology : true , useNewUrlParser : true});
mongoose.connection.once('open',()=> {
    console.log("dataBase is related sucessfully");
})

// Handling GET request
app.get('/', (req, res) => {
    res.send('A simple Node App is '
        + 'running on this server')
    res.end()
})

//Routers 
app.use("/Auth",UserRouter);
app.use('/Etablissement',EtablissementRouter)
 
