const mongoose=  require("mongoose");

const SlideScheama = mongoose.Schema({
    titre : {
        type : String,
    },
    photo : {
        type : String,
    }
})

const Slide = mongoose.model("Slide" , SlideScheama);

module.exports = Slide