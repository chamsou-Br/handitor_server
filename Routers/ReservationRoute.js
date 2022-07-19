const express= require("express");
const ReservationController = require("../Controllers/reservationController")

const ReservationRouter = express.Router();

ReservationRouter.get("/" , ReservationController.getAllReservation);
ReservationRouter.get("/:id" ,ReservationController.getReservation);
ReservationRouter.post('/',ReservationController.addReservation);
ReservationRouter.delete("/:id",ReservationController.deleteReservation);

module.exports = ReservationRouter