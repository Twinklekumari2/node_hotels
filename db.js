//very important

const mongoose = require('mongoose');
//define the mongoDB connection url
const mongoURL = 'mongodb://localhost:27017/hotels'


//set up connection(ye required parameter hai)
mongoose.connect(mongoURL,{
    useNewURlParser:true,
    useUnifiedTopology: true
})

//isi connection se hum apne db server and nodejs server ko connect krte hsi 
//isse mongoose khud maintain karta hai
const db = mongoose.connection;

db.on('connected',() => {     
    console.log('connected to MongoDB server');
})

db.error('disconnected', (err)=>{
    console.log('MongoDB connection error: ',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//export
module.exports = db;