import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item - using this we will add new food item to the databse
//Using this function we will create one route
const addFood = async(req,res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true, message:"Food Added"})
    } catch(error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

//all food list
const listFood = async(req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//remove food item
const removeFood = async(req,res) => {
    try {
        const food = await foodModel.findById(req.body.id); //First we will find the food item that we want to delete and we find it using its id
        fs.unlink(`uploads/${food.image}`, ()=>{}) //We remove the food item image from the upload folder
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {addFood,listFood,removeFood} 