const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const checkuser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "Handitor", async (err, encoded) => {
      if (err) {
        throw Error("error in JWT");
      }
      if (encoded) {
        const user = await User.findById(encoded.id);
        res.status(200).send({ existe: true, user: user });
      }
    });
  } else res.status(400).send({ existe: false });
};

const getToken = async (id) => {
  return jwt.sign({ id }, "Handitor", {
    expiresIn: 3 * 60 * 60 * 24,
  });
};

const HandlError = (err) => {
  let errors = {
    email: null,
    password: null,
    firstName: null,
    famillyName: null,
    phoneNumber: null,
    dateOfBirth : null,
    sex : null,
    country : null
  };
  console.log("erroororoorro")
  if (err.code === 11000) {
    if (err.keyValue.email) {
      errors.email = "cet email est déja existé";
    }
    if (err.keyValue.phoneNumber) {
        errors.phoneNumber = "cette nemuro  est déja existé"
    }
    return errors;
  }
  if (err.message.includes("UserModal validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
        console.log(properties.path)
      errors[properties.path] = properties.message;
    });
  }
  if (err.message === "incorrect Email") {
    errors.email = "Email n'est pas correct";
  }
  if (err.message === "incorrect Password") {
    errors.password = "mot de pass n'est pas correct";
  }
  if (err.message === "password min length") {
    errors.password = "La longeur minimale est 8 caractère";
  }
  console.log(errors)
  return errors;
};

module.exports = { getToken, HandlError, checkuser };
