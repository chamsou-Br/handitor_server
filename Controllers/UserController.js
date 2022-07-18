const User = require("../modals/User");
const authController = require("../Controllers/AuthController");

const LoginContoller = async (req, res) => {
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
};

const RegisterConroller = async (req, res) => {
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
  console.log(info)
  const { user, err } = await User.register(info);
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
};

module.exports = { LoginContoller, RegisterConroller };
