import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user order for frontend
const placeOrder = async(req,res) => {

    const frontend_url = "http://localhost:5173"


    try {
        const newOrder = new orderModel({  //Here we will create the new Order
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save(); //It will save the order in our database.
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}}); //It will clear the users cart after the user has placed the order

        //Now we will add the logic to creat the payment link using stripe
        //To create stripe payment link first we need to create line items-where we will insert all the product data,currency, unit amount and quantity
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr", //indian currency - inr
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80 //To convert dollar to inr
            },
            quantity:item.quantity
        }))

        line_items.push({  //We are adding one more line item that is delivery charge
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        //Using these line items, we will create one session using .create() in which we will pass line items and also the success url anc cancel url
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, //If the payment is successful we will be redirected to this url
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}` 
        })

        res.json({success:true,session_url:session_url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    const {orderId , success} = req.body;
    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

}

export { placeOrder, listOrders, userOrders, updateStatus ,verifyOrder }