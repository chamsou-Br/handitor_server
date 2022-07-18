const mongoose = require('mongoose');

const ReservationScheama = mongoose.schema({
    client : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserModal"
    },
    montant : {
        type : Number, 
    },
    etat :  {
        type : String ,
        default : "",
    },
    typeChambre : {
        type : mongoose.Schema.Types.ObjectId,
        ref :  "TypeChambre"
    },
    dateD : {
        type : Date,
    },
    dateF : {
        type : Date
    }


})