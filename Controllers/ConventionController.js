const TypeConvention = require("../modals/TypeConvention");

// multer to upload picture
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Convention/");
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

const getConvention = async (req, res) => {
  try {
    const convention = await TypeConvention.findById(req.params.id);
    res.status(200).send(convention);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllConvention = async (req, res) => {
  try {
    const conventions = await TypeConvention.find({});
    res.status(200).send(conventions);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteConvention = async (req, res) => {
  try {
    const convention = await TypeConvention.findByIdAndDelete(req.params.id);
    res.status(200).send({ sucess: true });
  } catch (err) {
    res.status(400).send(err);
  }
};

const desactiveConvention = async (req, res) => {
  try {
    const convention = await TypeConvention.findById(req.params.id);
    convention.active = false;
    convention.save().then(() => {
      res.status(200).send(convention);
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const activeConvention = async (req, res) => {
  try {
    const convention = await TypeConvention.findById(req.params.id);
    convention.active = true;
    convention.save().then(() => {
      res.status(200).send(convention);
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const addConvention = async (req, res) => {
  try {
    const convention = await TypeConvention.create(req.body);
    convention.photo = req.file.path;
    console.log("mmm");
    convention.save().then(() => {
      res.status(200).send(convention);
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = {
  getConvention,
  getAllConvention,
  addConvention,
  deleteConvention,
  desactiveConvention,
  activeConvention,
  upload,
};
