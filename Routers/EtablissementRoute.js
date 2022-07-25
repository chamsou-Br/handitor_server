const express = require("express")
const ChambreController = require("../Controllers/ChambreController")
const Etablissementcontroller = require("../Controllers/EtablissementController")
const AuthController = require("../Controllers/AuthController")

const EtablissementRouter = express.Router()







// use Format json
EtablissementRouter.use(express.json())
EtablissementRouter.use(express.urlencoded({extended : true}))

// routers
EtablissementRouter.post('/' ,AuthController.checkToken,Etablissementcontroller.upload.array("photo"), Etablissementcontroller.addEtablissement)
EtablissementRouter.post("/:id/upload",AuthController.checkToken,Etablissementcontroller.upload.array("photo"),Etablissementcontroller.addPictureEtablissement)
EtablissementRouter.get('/' ,AuthController.checkToken, Etablissementcontroller.getAllEtablissement)
EtablissementRouter.get("/:id" ,AuthController.checkToken, Etablissementcontroller.getEtablissement)
EtablissementRouter.delete("/:id",AuthController.checkToken,Etablissementcontroller.deleteEtablissement)
EtablissementRouter.get('/:id/TypeChambre' ,AuthController.checkToken ,ChambreController.getTypeChambresOfEtablissement )
EtablissementRouter.post("/:id/addTypeChambre",AuthController.checkToken,ChambreController.addTypeChambre)

// export EtablissementRouter
module.exports = EtablissementRouter;