import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

  const navigate = useNavigate();

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const[data,setData] = useState({ //This state variable will store the data from form on the payment page
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = []; //we will push all the item details in this array.
    food_list.map((item) => {
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = { //We generated the order Data and this order data will be to sent to api and if response is true we will sent this to session url
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      // toast.error("Something Went Wrong")
      console.log(error);
    }
  }

  useEffect(() => {
    if (!token) {
        toast.error("to place an order sign in first")
        navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
        navigate('/cart')
    }
}, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title"> Delivery Information</p>
        <div className="multi-field">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text"  placeholder='Street'/>
        <div className="multi-field">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-field">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone'/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p> {/*If there are no items in cart then totalAmount=0 then delivery fee should also be zero else if there is item in cart delivery fee=2 */}
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>
            </div>
            <button className='place-order-submit' type='submit'>PROCEED TO PAYMENT</button>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder
