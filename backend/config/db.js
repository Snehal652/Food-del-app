//Here we will create logic to connect with the databse

import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://snehalprdc2003:snehaltripathiprdc@cluster0.ajg1um3.mongodb.net/').then(()=>console.log("DB Connected"));
}