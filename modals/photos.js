const mongoose = require("mongoose");

const PhotosScheama  =mongoose.Schema({
    photo : {
        type  : String
    },
    etablissement  : {
      type :  mongoose.Schema.Types.ObjectId,
      ref: 'Etablissement'
    }
});

const Photos = mongoose.model("Photos" , PhotosScheama)

module.exports = Photos