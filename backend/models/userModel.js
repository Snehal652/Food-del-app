//Here we will create the model and schema for the user login and signup
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
}, {minimize:false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema); //If a user model is already created tthen it will use that one else it will create a new model.
export default userModel;