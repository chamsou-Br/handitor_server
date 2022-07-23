const TypeChambre = require("../modals/TypeChambre");

// get all typechambre of an etablissement
const getTypeChambresOfEtablissement = async (req, res) => {
  TypeChambre.find({ etablissement: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({ err: err });
    });
};

const addTypeChambre = (req, res) => {
  try {
    req.body.TypeChambre.map((item) => {
      const chambre = JSON.parse(item);
      TypeChambre.create({
        etablissement: req.params.id,
        montant: chambre.montant,
        descreption: chambre.descreption,
      });
    });
    const chambre  = TypeChambre.find({ etablissement: req.params.id,})
    res.status(200).send(chambre)
  }catch(err) {
    res.status(400).send(err)
  }
  
};

module.exports = { getTypeChambresOfEtablissement, addTypeChambre };
