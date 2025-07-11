const { uniqueId } = require('lodash')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


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
    },
    username:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String,
    }
});
personSchema.pre('save',async function(next) {
    const person = this;
    if(!person.isModified('password')) return next();
    //false hoga toh skip nhi karenge
    try{
        //ye hum kab karenge?? -> jab hame password generate karna hoga tab
        //hash password generation

        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt); //salt+pswd

        //override the plain password
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);

    }
    
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}


const Person = mongoose.model('Person',personSchema)

module.exports = Person