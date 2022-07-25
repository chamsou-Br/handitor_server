const express = require("express");
const SlideController = require("../Controllers/SlideController")
const AuthController = require("../Controllers/AuthController")

const SlideRouter = express.Router();

SlideRouter.get("/",AuthController.checkToken,SlideController.getAllSlides);
SlideRouter.get("/:id",AuthController.checkToken,SlideController.getSlide);
SlideRouter.delete("/:id",AuthController.checkToken,SlideController.deleteSlide)
SlideRouter.post("/",AuthController.checkToken,SlideController.upload.single('photo'),SlideController.addSlide)

module.exports  = SlideRouter