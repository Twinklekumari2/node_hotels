const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const { json } = require('body-parser');
const  {jwtAuthMiddleware,generateToken} = require('./../jwt.js')

router.post('/signup',async (req,res) => {
    try{
        //assuming the reauest body contains the person data
        const data =req.body;
        //create a new person document using the mongoose model
        const newPerson = new Person(data);
        //save the new person to the database
        const response = await newPerson.save();
        console.log("data saved");
        
        const payload = {
            id: response.id,
            username: response.username
        }

        const token = generateToken(payload);
        console.log("Token is: "+token);
        res.status(200).json({response:response,token:token});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});


    }
})

//login
router.post('/login', async (req,res) => {
    try{

        const {username, password} = req.body;
        
    }catch(err){

    }
})


router.get('/', async(req,res) => {
    try{
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"});
    }

})
router.get('/:workType', async(req,res) => {
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work:workType});
            console.log("data fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: "input not match found"})
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"});

    }
})

router.put('/:id', async (req,res) => {
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true,
        })
        if(!response){
            console.log("person not found");
            res.status(404).json("person not found")
        }
        console.log("data updated");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).jsonp({err:"internal server error"});

    }
})

router.delete('/:id', async (req,res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            console.log("not found")
            res.status(404).json(response);
        }
        console.log("data deleted");
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"})

    }
})

module.exports = router