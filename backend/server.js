// dependecies installed -> express(for creating server), mongoose(for connecting with databse), jsonwebtoken(authentication), bcrypt(to encrypt user data and store it in database), cors(to give permission to frontend to connect with backend), dotenc(for enviorment variables), body-parser(to parse the data coming through user), multer(to create image store system), stripe(to add payment gateways), validator(to check email id and password valid or not), nodemon(to restart server on saving the project)  
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js' 
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json()) //using this middleware whenever we will get data from frontend to backend, it will be parsed using this json.
app.use(cors()) // using this middleware we can access the backend from anywhere in frontend. 

//connect with DB
connectDB();

//api endpoints
app.use("/api/user",userRouter)
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads')) //We have mount the uploads folder at /image endpoint. 
app.use("/api/cart",cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req,res) => {
    res.send("API working")
})

//run express server
app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)
})