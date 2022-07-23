const express = require("express");
const ConventionController = require("../Controllers/ConventionController")
const ConventionRouter = express.Router();

ConventionRouter.get('/' , ConventionController.getAllConvention);
ConventionRouter.get("/:id",ConventionController.getConvention);
ConventionRouter.post("/",ConventionController.upload.single('photo'),ConventionController.addConvention);
ConventionRouter.delete("/:id" , ConventionController.deleteConvention);
ConventionRouter.get("/active/:id" , ConventionController.activeConvention);
ConventionRouter.get('/desactive/:id', ConventionController.desactiveConvention);

module.exports = ConventionRouter