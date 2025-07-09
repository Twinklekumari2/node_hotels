const express = require('express')
const router = express();
const MenuItem = require('./../models/Menu')

router.post('/', async (req,res) => {
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);

        const response = await newMenu.save();

        console.log("Menu item data Saved successfully");
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"Internal Server Error"})
    }
})

router.get('/', async (req,res) => {
    try{

        const data = await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"})
    }
})

router.put('/:id', async (req,res) => {
    try{
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
            new:true,
            runValidators:true,
        })

        if(!response){
            console.log("menu item not found")
            res.status(404).json(response)
        }

        console.log("data updated");
        res.status(200).json(response)

    }catch(err){
        console.log(err)
        res.status(500).json({err:"internal server error"})

    }

})

router.delete('/:id', async (req,res) => {
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            console.log("menu item not find");
            res.status(404).json(response)
        }
        console.log("data deleted");
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({err:"Internal server error"})

    }
})


module.exports = router