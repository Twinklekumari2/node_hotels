const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:Array,
        default:[]
    },
    num_sales:{
        type:Number,
        default:0 //entry ke wakt default zero
    }


})
const MenuItem = mongoose.model('Menu',menuItemSchema)
module.exports = MenuItem;