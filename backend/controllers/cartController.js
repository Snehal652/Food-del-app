import userModel from "../models/userModel.js"

//add items to user cart
const addToCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId); // Here we get 'req.body.userId' from middleware auth.js so while requesting we will send the token not the id and the middleware will convert the token into id
        let cartData = await userData.cartData;
        //So when the user will have to add item to the cart they would have to send the token and with that they will send the item id 
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1; // if the user want to add item to the cart and there is no cart id,in that case it will create a new entry
        }
        else {
            cartData[req.body.itemId] += 1 //If cartId is there we will increase it value;
        }

        //Now we have to update the usercart with this new cart data
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Added to Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


//remove items from user cart
const removeFromCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId); //The middleware will convert the token into userId
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true,message:"Removed from Cart"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//fetch user cart data
const getCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData:cartData });
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export{addToCart,removeFromCart,getCart}