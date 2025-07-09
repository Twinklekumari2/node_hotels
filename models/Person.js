const { uniqueId } = require('lodash')
const mongoose = require('mongoose')


const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type: Number,
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],  //in 3 mei se hi kuch bharna hoga varna accept nhi hoga
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true, //unique email hona chahiye
    },
    address:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    }
})

const Person = mongoose.model('Person',personSchema)

module.exports = Person