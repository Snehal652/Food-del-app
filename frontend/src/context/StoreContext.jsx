import { createContext, useEffect, useState } from "react";
import { food_list} from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000" // we will pass this in context value so that we can access it any component
    // const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("")

    const [cartItems, setCartItems] = useState({});
    //Now we will create functionality of 'add to cart' and 'remove from cart'
    const addToCart = async (itemId) => {
        //If we are adding the product for the first time to the cart in that case we will create one entry.
        // if the cart items Item ID is not available in that case we will use set cart items and here we will pass our previous cart data and here we will return one object
        // where we will Define the itemID and the value will be one.
        //Else if any product item is already available then and quantity is 1 in that case we will increase that.
        if(!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]:1}))
        } //This will create a new entry for our first product if that item is not available.
        else {
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        } //If item already available then it will increase the value by 1 

        if(token){
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}}) //if token is available, whatever items we have added in the cart we will update in the database as well
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1})) // It will decrease the value by 1
        if(token) {
            await axios.post(url+"/api/cart/remove", {itemId},{headers:{token}})
        }
    } 

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems) { //Here cartItems is object and we iterating over it using key value "item"
            if(cartItems[item]>0) { //Function will be executed only when quantity of that item is greater than zero.
                let itemInfo = food_list.find((product) => product._id===item); //If our product id is matching with the item that means this product is available in the cart. In that case we will calculate totalAMount.
                totalAmount+=itemInfo.price * cartItems[item]; //Here cartItem[item] represents the quantity of that item.
            }
        }
        return totalAmount; 
    }

    

    
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list") //when we will hit this api we will get the food list
        setFoodList(response.data.data)
    }

    const loadCartData = async(token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }


    

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems]) //When cartItems will be updated we will console log the cartItems.
    //contextValue will be an object. If I add any element in this object, it can be accessed in any component using the contect.

    useEffect(()=>{ //This if for fetching the foodlist and preventing the token to be removed from local storage after reloading the page. It shoulf only remove the token when we click on logout
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                // await loadCartData(localStorage.getItem("token"));
                await loadCartData({ token: localStorage.getItem("token")})
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        loadCartData
    }
    //using context , we can access food_list array anywhere.
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

      