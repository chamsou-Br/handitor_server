const mongoose = require('mongoose');

const ReservationScheama = mongoose.Schema({
    client : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserModal"
    },
    typePayment : {
        type : String
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

const Reservation = mongoose.model("Reservation" ,ReservationScheama);
module.exports = Reservation