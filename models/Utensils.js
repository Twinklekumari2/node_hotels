const mongoose = require('mongoose');

const utensilsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    quality:{
        type:String,
        default:"Good"
    },
    type:{
        type:String,
        default:"steel",
    },
    size:{
        type:Number,
    }


})

const Utensils = mongoose.model('Utelsils',utensilsSchema)
module.exports = Utensils