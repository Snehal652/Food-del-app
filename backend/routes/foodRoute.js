import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

//using this router we can access different methods like get,post,patch,update,etc
const foodRouter = express.Router();

//Image Storage Enginer = for storing the images of the food item
const storage = multer.diskStorage({
    destination:"uploads", //we will store the images in "uploads" file
    filename:(req,file,cb) => {
        return cb(null, `${Date.now()}${file.originalname}`) //we will store every image with unique name and that unique name will be = timestamp + orignal name.
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"), addFood) //To add food item
foodRouter.get("/list", listFood)  //To get list of all food items
foodRouter.post("/remove", removeFood); // To remove any food item.


export default foodRouter;