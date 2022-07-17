const express = require("express");
const UserRouter = express.Router();
const UserController = require("../Controllers/UserController");
const User = require("../modals/User");

UserRouter.use(express.json());
UserRouter.use(express.urlencoded({extended : true}));

UserRouter.get("/test" , (req , res) =>{
    res.status(200).send("test with sucessful");
})

UserRouter.post("/login" , UserController.LoginContoller);
UserRouter.post("/register" , UserController.RegisterConroller)

module.exports = UserRouter