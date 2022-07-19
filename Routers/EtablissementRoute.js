const express = require("express")
const Etablissementcontroller = require("../Controllers/EtablissementController")

const EtablissementRouter = express.Router()







// use Format json
EtablissementRouter.use(express.json())
EtablissementRouter.use(express.urlencoded({extended : true}))

// routers
EtablissementRouter.post('/' ,Etablissementcontroller.upload.array("photo"), Etablissementcontroller.addEtablissement)
EtablissementRouter.post("/upload",Etablissementcontroller.upload.array("photo"),Etablissementcontroller.addPictureEtablissement)
EtablissementRouter.get('/' , Etablissementcontroller.getAllEtablissement)
EtablissementRouter.get("/:id" , Etablissementcontroller.getEtablissement)
EtablissementRouter.get('/:id/TypeChambre'  ,Etablissementcontroller.getTypeChambresOfEtablissement )
EtablissementRouter.delete("/:id",Etablissementcontroller.deleteEtablissement)


// export EtablissementRouter
module.exports = EtablissementRouter;