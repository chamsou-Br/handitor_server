const Etablissement = require("../modals/Etablissement");
const TypeChambre = require("../modals/TypeChambre");
const Photos = require("../modals/photos");


// add ETablissement

const addEtablissement = async (req, res) => {
  Etablissement.create(req.body)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};

// add picture of Etablissement
const addPictureEtablissement = (req, res) => {
    res.send("sucess")
};

// fetch all in etalissement
const getAllEtablissement = async (req, res) => {
  Etablissement.find({})
    .then((data) => {
      var newData = [];
      data.forEach(async (Eta) => {
        const photos = await Photos.find({ etablissement: Eta._id });
        newData.push({ ...Eta, photos });
      });
      res.status(200).send(newData);
    })
    .catch((err) => {
      res.status(400).send({ err: err });
    });
};

// get etablissement with id
const getEtablissement = async (req, res) => {
  const photo = await Photos.find({ etablissement: Eta._id });
  Etablissement.findById(req.params.id)
    .then((data) => {
      res.status(200).send({ ...data, photo });
    })
    .catch((err) => {
      res.status(400).send({ err: err });
    });
};

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

module.exports = {
  getAllEtablissement,
  getEtablissement,
  getTypeChambresOfEtablissement,
  addEtablissement,
  addPictureEtablissement,
};
