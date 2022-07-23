const Etablissement = require("../modals/Etablissement");
const TypeChambre = require("../modals/TypeChambre");
const Photos = require("../modals/photos");

// multer to upload picture
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Etablissement/");
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

// fetch all etablissement
const getAllEtablissement = async (req, res) => {
  Etablissement.find({})
    .then(async (data) => {
      var newdata = [];
      for (i = 0; i < data.length; i++) {
        const Eta = data[i];
        const photo = await Photos.find({ etablissement: Eta._id });
        const chambres = await TypeChambre.find({ etablissement: Eta._id });
        newdata.push({ ...Eta._doc, photo, typeChambre: chambres });
      }
      res.status(200).json(newdata);
    })
    .catch((err) => {
      res.status(400).send({ err: err });
    });
};

// get etablissement with id
const getEtablissement = async (req, res) => {
  const photo = await Photos.find({ etablissement: req.params.id });
  const chambre = await TypeChambre.find({ etablissement: req.params.id });
  Etablissement.findById(req.params.id)
    .then((data) => {
      console.log(data);
      res.status(200).send({ ...data._doc, photo, typeChambre: chambre });
    })
    .catch((err) => {
      res.status(400).send({ err: err });
    });
};

// add ETablissement
const addEtablissement = async (req, res) => {
  Etablissement.create(req.body)
    .then((data) => {
      // save type chmabre
      req.body.TypeChambre
        ? req.body.TypeChambre.map((item) => {
            const chambre = JSON.parse(item);
            TypeChambre.create({
              etablissement: data._id,
              montant: chambre.montant,
              descreption: chambre.descreption,
            });
          })
        : null;

      // save picture of etablissement
      req.files.map(async (file) => {
        Photos.create({
          photo: file.path,
          etablissement: data._id,
        });
      });
      res.status(200).send({ sucess: true ,data });
    })
    .catch((err) => res.status(400).send(err));
};

// add picture of Etablissement
const addPictureEtablissement = async (req, res) => {
  await req.files.map(async (file) => {
    Photos.create({
      photo: file.path,
      etablissement: req.params.id,
    });
  });
  res.status(200).send({ sucess: true });
};

//delete etablissement
const deleteEtablissement = async (req, res) => {
  try {
    Etablissement.findByIdAndDelete({ _id: req.params.id }).then(() => {
      TypeChambre.deleteMany({ etablissement: req.params.id }).then(() => {
        Photos.deleteMany({ etablissement: req.params.id }).then(() => {
          res.status(200).send({ sucess: true });
        });
      });
    });
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

module.exports = {
  getAllEtablissement,
  getEtablissement,
  addEtablissement,
  addPictureEtablissement,
  deleteEtablissement,
  upload,
};
