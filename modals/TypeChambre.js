const mongoose = require("mongoose")

const TypeChambreScheama = mongoose.Schema({
    title : {
        type : String,
    },
    montant : {
        type : Number
    },
})

const  TypeChambre = mongoose.model("TypeChambre",TypeChambreScheama);

module.exports = TypeChambre