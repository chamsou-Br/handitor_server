const mongoose = require("mongoose");

const TypeConventionScheama = mongoose.Schema({
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin"
    },
    reduction : {
        type : Number,        
    },
    dateD : {
        type : Date,
    },
    dateF : {
        type : Date
    },
    active :{
        type : Boolean ,
        default : true
    },
    typeChambre : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "TypeChambre"
    },
    photo : {
        type : String,
    }
})

const TypeConvention = mongoose.model("TypeConvention",TypeConventionScheama);

module.exports = TypeConvention ;