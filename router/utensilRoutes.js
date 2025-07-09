const express = require('express')
const router = express();
const utensilRoutes = require('./../models/Utensils')


router.post('/',async (req,res) => {
    try{
        const data = req.body;
        const newUtensil = new Utensils(data);
        const response = await newUtensil.save();

        console.log("data posted");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({err:"Internal server error"})
    }
})

router.get('/', async (req,res) => {
    try{
        const data = await Utensils.find();
        console.log("data fetched");
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({err:"Internal server error"})

    }
})

module.exports = utensilRoutes