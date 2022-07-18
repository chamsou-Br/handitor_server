const express = require("express")
const Etablissementcontroller = require("../Controllers/EtablissementController")

const EtablissementRouter = express.Router()

// multer to upload picture
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Etablissement/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + '.' + file.mimetype.split("/")[1]);
  },
});

var upload = multer({ storage: storage });





// use Format json
EtablissementRouter.use(express.json())
EtablissementRouter.use(express.urlencoded({extended : true}))

// routers
EtablissementRouter.post('/' , Etablissementcontroller.addEtablissement)
EtablissementRouter.post("/upload",upload.array("photo"),Etablissementcontroller.addPictureEtablissement)
EtablissementRouter.get('/' , Etablissementcontroller.getAllEtablissement)
EtablissementRouter.get("/:id" , Etablissementcontroller.getEtablissement)
EtablissementRouter.get('/:id/TypeChambre'  ,Etablissementcontroller.getTypeChambresOfEtablissement )


// export EtablissementRouter
module.exports = EtablissementRouter;