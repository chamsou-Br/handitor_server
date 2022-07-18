const mongoose = require("mongoose");

const AdminScheama  = mongoose.Schema({
    nom  : {
        type : String ,
        require : true ,
    },
    prenom  : {
        type : String , 
        require : true
    },
    email : {
        type : String ,
        require : true , 
        unique : true  
    },
    motDePass : {
        type : String , 
        require : true
    }
})

const Admin = mongoose.model("Admin" , AdminScheama);

module.exports = Admin