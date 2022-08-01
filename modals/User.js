const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {isEmail,isMobilePhone} = require("validator")
const authController = require("../Controllers/AuthController")

const UserSchema = mongoose.Schema({
    firstName : {
        type : String ,
        required : [true,'Veuillez entrer un prénom'], 
    },
    famillyName  : {
        type : String ,
        required : [true,'Veuillez entrer un Nom'], 
    },
    email : {
        type : String ,
        required : [true,'Veuillez entrer un email'],
        validate : [isEmail ,'Veuillez entrer un valid email'],
        unique : true,
        lowercase : true
    },
    phoneNumber : {
        type : String,
    },
    password : {
        type :String,
        required :[true,'Veuillez entrer un mot de pass'],
        min : [8,'La longeur minimale est 8 caractère'],
    },
    dateOfBirth : {
        type : String , 
        required : [true,'Veuillez entrer un date de naissance']
    },
    sex : {
        type : String , 
        required : [true,'Veuillez entrer un genre']
    },
    handicape : {
        type : Boolean , 
        default : false , 
    },
    typeHandicape : {
        type : String , 
    },
    wilaya :  {
        type : String , 
        required : [true,'Veuillez entrer un wilaya']
    },
    infoCard : {
        type : mongoose.Schema.Types.ObjectId,
         ref: 'InfoCard'
    },
    active : {
        type : Boolean , 
        default : true
    }

 
},{
    timestamps : true
})



UserSchema.statics.login = async(email , password ,) => {
    try {
            const user = await User.findOne({email});
            if (user) {
                const auth = await bcrypt.compare(password , user.password);
                if (auth) {
                    return {user}
                }
                throw Error('incorrect Password');
            }
            throw Error('incorrect Email');
      
    }catch (err) {
        const errour = authController.HandlError(err);
        return {err  : errour}
    }
}
UserSchema.statics.register = async(info) => {
    try{
            const salt = await bcrypt.genSalt();
            let passwordHash = null;
            if (info.password ? info.password.length >= 8 : false) {
                 passwordHash = await bcrypt.hash(info.password , salt);
           } else {
               throw Error("password min length")
           } 
           console.log("^")
            const user = await User.create({...info , password : passwordHash});
            console.log("^^")
            return {user}
    }catch(err) {
        console.log(err)
        const errour = authController.HandlError(err);
        return {err  : errour}
    }
}

const User = mongoose.model("UserModal" , UserSchema)
module.exports = User ;