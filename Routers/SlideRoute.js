const express = require("express");
const SlideController = require("../Controllers/SlideController")

const SlideRouter = express.Router();

SlideRouter.get("/",SlideController.getAllSlides);
SlideRouter.get("/:id",SlideController.getSlide);
SlideRouter.delete("/:id",SlideController.deleteSlide)
SlideRouter.post("/",SlideController.upload.single('photo'),SlideController.addSlide)

module.exports  = SlideRouter