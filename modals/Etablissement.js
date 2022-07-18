const mongoose = require("mongoose")

const EtablissementScheama = mongoose.Schema({
    titre : {
        type : String,
    },
    location : {
        type : String,
    },
    categorie : {
      type : String  
    },
    rating : {
        type : Number,
    },
    wilaya : {
        type : String
    },
    phone : {
        type : String,
    },
    email : {
        type : String 
    },
    website : {
        type : String,
    },
    accesibilite : [String],
    pointsFort : [String]
});

/* 
    accesibilite : {
        rampAccesExterieur : {type : Boolean} ,
        ascenseur : {type : Boolean},
        stationementPourEndecapees : {type : Boolean},
        largePortesPourFauteuilsroulats : {type  : Boolean},
        toilette : {type : Boolean}
    },
    pointsFort : {
        stationementGratuit : {type : Boolean},
        wifi : {type : Boolean},
        animauxAcceptes  : { type : Boolean}

    }
*/
const Etablissement = mongoose.model("Etablissement" , EtablissementScheama);
module.exports = Etablissement;