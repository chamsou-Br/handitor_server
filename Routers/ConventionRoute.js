const express = require("express");
const ConventionController = require("../Controllers/ConventionController")
const AuthController = require("../Controllers/AuthController")
const ConventionRouter = express.Router();

ConventionRouter.get('/' ,AuthController.checkToken, ConventionController.getAllConvention);
ConventionRouter.get("/:id",AuthController.checkToken,ConventionController.getConvention);
ConventionRouter.post("/",AuthController.checkToken,ConventionController.upload.single('photo'),ConventionController.addConvention);
ConventionRouter.delete("/:id" ,AuthController.checkToken, ConventionController.deleteConvention);
ConventionRouter.get("/active/:id" ,AuthController.checkToken, ConventionController.activeConvention);
ConventionRouter.get('/desactive/:id',AuthController.checkToken, ConventionController.desactiveConvention);

module.exports = ConventionRouter