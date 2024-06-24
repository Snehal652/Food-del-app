//This is for creating the logic for user login and signup

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.json({success:false, message:"Invalid Credentials"})
        }

        //If the password matches then -> generate a token and send it as a response
        const token = createToken(user._id);
        res.json({success:true,token})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}



const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async(req,res) => {
    const {name,password,email} = req.body; //destructure the data from body
    try {
        //checking if the user exists or not
        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({success:false, message:"User Already Exists"})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email id"})
        }
        if(password.length<8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        //Now since everything is correct we will register the user
        //First we will hash the password using bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        //Now we will create new user using name,email and hashedpassword and save it in the databse using .save() method
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()

        //Creating and sending the token as response
        const token = createToken(user._id)
        res.json({success:true,token});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export {loginUser, registerUser}