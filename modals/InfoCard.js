const mongoose = require("mongoose");

const InfoCardScheama = mongoose.Schema({
    num : {
        type : Number,
        require : true
    },
    photo : {
        type : String
    },
    client : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'UserModal'
    }
})

const InfoCard = mongoose.model('InfoCard' , InfoCardScheama);

module.exports = InfoCard