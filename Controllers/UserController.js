const User = require("../modals/User");
const authController = require("../Controllers/AuthController");


// multer to upload picture
const multer = require("multer");
const InfoCard = require("../modals/InfoCard");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/InfoCard/");
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

const LoginContoller = async (req, res) => {
  try{
    const { user, err } = await User.login(req.body.email, req.body.password);
    if (err) res.status(400).send(err);
    else {
      const token = await authController.getToken(user._id);
      res.cookie("Handitor", token, {
        httpOnly: true,
        maxAge: 12 * 30 * 24 * 3600 * 1000,
      });
      res.status(200).json({ token: token });
    }
  }
  catch(err) {
    res.status(400).send(err)
  }
};

const RegisterConroller = async (req, res) => {
  try {
    const data = req.body;
    const info = {
      firstName :  data.firstName,
      famillyName : data.famillyName,
      email : data.email,
      phoneNumber : data.phoneNumber,
      password : data.password,
      dateOfBirth : data.dateOfBirth,
      sex : data.sex ,
      country : data.country ,
      handicape : data.handicape,
      typeHandicape : data.typeHandicape
    }
  
  
    const { user, err } = await User.register(info);
    const card = InfoCard.create({
      num : data.num,
      photo : req.file ? req.file.path : null ,
      client : user._id
    })
    if (err) {
      res.status(400).send(err);
    } else {
      const token = await authController.getToken(user._id);
      res.cookie("Handitor", token, {
        httpOnly: true,
        maxAge: 12 * 30 * 24 * 3600 * 1000,
      });
      res.status(200).json({token , user });
    }
  }
  catch(err) {
    res.status(400).send(err)
  }

};

module.exports = { LoginContoller, RegisterConroller , upload};
