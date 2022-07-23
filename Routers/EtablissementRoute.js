const express = require("express")
const ChambreController = require("../Controllers/ChambreController")
const Etablissementcontroller = require("../Controllers/EtablissementController")

const EtablissementRouter = express.Router()







// use Format json
EtablissementRouter.use(express.json())
EtablissementRouter.use(express.urlencoded({extended : true}))

// routers
EtablissementRouter.post('/' ,Etablissementcontroller.upload.array("photo"), Etablissementcontroller.addEtablissement)
EtablissementRouter.post("/:id/upload",Etablissementcontroller.upload.array("photo"),Etablissementcontroller.addPictureEtablissement)
EtablissementRouter.get('/' , Etablissementcontroller.getAllEtablissement)
EtablissementRouter.get("/:id" , Etablissementcontroller.getEtablissement)
EtablissementRouter.delete("/:id",Etablissementcontroller.deleteEtablissement)
EtablissementRouter.get('/:id/TypeChambre'  ,ChambreController.getTypeChambresOfEtablissement )
EtablissementRouter.post("/:id/addTypeChambre",ChambreController.addTypeChambre)

// export EtablissementRouter
module.exports = EtablissementRouter;