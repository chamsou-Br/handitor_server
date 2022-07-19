const mongoose = require("mongoose")

const TypeChambreScheama = mongoose.Schema({
    descreption : {
        type : String,
    },
    montant : {
        type : Number
    },
    etablissement : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Etablissement"
    }
})

const  TypeChambre = mongoose.model("TypeChambre",TypeChambreScheama);

module.exports = TypeChambre