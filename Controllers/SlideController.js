const Slide = require("../modals/slide")

// multer to upload picture
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Slide/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});
var upload = multer({ storage: storage });


const getAllSlides = async (req , res ) => {
    try{
        Slide.find({}).then(data => {
            res.status(200).send(data)
        })
    }
    catch(err) {
        res.status(400).send(err)
    }
}

const getSlide = async (req , res) => {
    try{
        const slid = await Slide.findById(req.params.id)
        res.status(200).send(slid);
    }
    catch(err) {
        res.status(400).send(err)
    }

}

const deleteSlide = async (req , res) => {
    try{
      const slide = await  Slide.findByIdAndRemove(req.params.id)
      
        res.status(200).send({sucess : true})
    }
    catch(err) {
        res.status(400).send(err)
    }
}

const addSlide = async (req , res)=> {
    try{
        const slid = await Slide.create({
            titre : req.body.titre,
            photo : req.file.path
        })
        res.status(200).send(slid)

    }
    catch(err) {
        res.status(400).send(err)
    }
}

module.exports = {getAllSlides,getSlide,deleteSlide,addSlide,upload}