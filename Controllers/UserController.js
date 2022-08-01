const User = require("../modals/User");
const authController = require("../Controllers/AuthController");
const fs  = require("fs")

// multer to upload picture
const multer = require("multer");
const InfoCard = require("../modals/InfoCard");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("111 file",file,req.body)
    cb(null, "./upload/InfoCard/");
  },
  filename: function (req, file, cb) {
    console.log(file,"000 file")
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
    if (err) res.send({err});
    else {
      const token = await authController.getToken(user._id);
      const card = await InfoCard.findOne({client : user._id})
      res.cookie("Handitor", token, {
        httpOnly: true,
        maxAge: 12 * 30 * 24 * 3600 * 1000,
      });
      res.status(200).json({ token: token , user , card  });
    }
  }
  catch(err) {
    
    res.status(400).send(err)
  }
};

const RegisterConroller = async (req, res) => {
  try {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if (req.body.InfoCard) {
      fs.writeFile("./upload/InfoCard/" + uniqueSuffix + ".png", req.body.InfoCard, 'base64', (err) => {
        if (err)  console.log("errrrr" ,err)
        })
    }

    const data = req.body;
    const info = {
      firstName :  data.firstName,
      famillyName : data.famillyName,
      email : data.email,
      password : data.password,
      dateOfBirth : data.dateOfBirth,
      sex : data.sex ,
      wilaya : data.wilaya ,
      handicape : data.InfoCard ? true : false,
      typeHandicape : data.typeHandicape
    }
  
  
    const { user, err } = await User.register(info);

    if (err) {
      console.log(err)
      res.send({err});
    } else {
      const card = InfoCard.create({
        num : data.num ? data.num :  null,
        photo : "upload/InfoCard/" + uniqueSuffix + ".png" ,
        client : user._id
      })
      const token = await authController.getToken(user._id);
      res.cookie("Handitor", token, {
        httpOnly: true,
        maxAge: 12 * 30 * 24 * 3600 * 1000,
      });
      res.status(200).json({token , user });
    }
  }
  catch(err) {
    console.log("epepeppe",err)
    res.status(400).send(err)
  }

};

module.exports = { LoginContoller, RegisterConroller , upload};
