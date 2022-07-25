const express= require("express");
const ReservationController = require("../Controllers/reservationController")
const AuthController = require("../Controllers/AuthController")

const ReservationRouter = express.Router();

ReservationRouter.get("/" ,AuthController.checkToken, ReservationController.getAllReservation);
ReservationRouter.get("/:id" ,AuthController.checkToken,ReservationController.getReservation);
ReservationRouter.post('/',AuthController.checkToken,ReservationController.addReservation);
ReservationRouter.delete("/:id",AuthController.checkToken,ReservationController.deleteReservation);

module.exports = ReservationRouter