import mongoose from "mongoose";
//First we create schema where we define properties required for adding a food item and after that we create model based on that schema.
const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price : {type:Number, required:true},
    image : {type:String, required:true},
    category: {type:String, required:true}
})

//Creating model based on above schema
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema); //We are using OR operator to specify that If model already there then it will be used otherwise we will create new model

export default foodModel;