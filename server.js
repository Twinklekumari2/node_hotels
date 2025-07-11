const express = require('express');
require('dotenv').config();
const db = require('./db');
const passport = require('./auth');
const app = express();

//initialize passport
app.use(passport.initialize());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


//middleware fucntion
const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);

const localAuthenticate = passport.authenticate('local',{session:false});

app.get('/',function(req,res) {
    res.send("Welcome to my hotel..how can i help you?")
})

// app.post('/person',(req,res) => {

//     const data = req.body;
//     const newPerson = new Person();
//     newPerson.name = data.name;
//     newPerson.age = data.age;
//     newPerson.work = data.work;
//     newPerson.address = data.address;
//     newPerson.salary = data.salary;
//     newPerson.mobile = data.mobile;
     
//     or

//     const newPerson = new Person(data);
//     newPerson.save((error,savedPerson) => {
//         if(error){
//             console.log("error saving person:",error);
//             res.status(500).json({error:"Internal server error "})
//         }
//         else{
//             console.log('data saved successfully');
//             res.status(200).json(savedPerson);
//         }
//     })
// })
const utensilRoutes = require('./router/utensilRoutes')
app.use('/utensils',utensilRoutes)

const menuRoutes = require('./router/menuRoutes');
app.use('/menu',menuRoutes)

const personRoutes = require('./router/personRoutes')
app.use('/person',localAuthenticate,personRoutes);

app.listen(PORT,() => {
    console.log("server is live");
})