const Reservation = require("../modals/Reservation");

const getAllReservation = async(req , res) => {
    try{
        const data =   await  Reservation.find({})
        res.status(200).send(data);
    }
    catch(err) {
        res.status(400).send({err  :err})
    }

}

const getReservation = async (req , res) => {
    try{
        const data =   await  Reservation.findById(req.params.id)
        res.status(200).send(data);
    }
    catch(err) {
        res.status(400).send({err  :err})
    }

}

const addReservation = async (req,res) => {
    try{
        Reservation.create(req.body).then(data => {
            res.status(200).send(data);
        })
    }
    catch(err) {
        res.status(400).send({err  :err})
    }
}

const deleteReservation = (req , res) => {
    try{
        Reservation.findByIdAndDelete(req.params.id).then(data => {
            res.status(200).send({sucess : true});
        })
    }
    catch(err) {
        res.status(400).send({err  :err})
    }
} 

module.exports = {getAllReservation , getReservation, addReservation , deleteReservation}