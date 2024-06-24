import React, { useContext} from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
//In this component we will get the image, price, desciption, id of the food as a prop from FoodDisplay component 

const FoodItem = ({id, name, price, description, image}) => {
    // const[itemCount, setItemCount] = useState(0); //For all product cart we will initialize it with 0.
    //The above code is creating state variable for every product. This is not a great practice. To solve this issue we will create a cartItem object in our contextApi
    const {cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);

  return (
    <div className="food-item">
        <div className="food-item-img-container">
            <img src={url+"/images/"+image} alt="" className="food-item-image" />
        {/* Here we will check that if our food item count is zero then we will display and "ADD" button
         if count is greater than zero then in that case we will provide a counter.*/}
        {/* When I click on add button it will disappear beacause its state changes from 0 to 1. */}
            {!cartItems[id] 
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
                :<div className='food-item-counter'>
                    <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt=''/> {/*This will remove item so we will do prev-1 */}
                    <p>{cartItems[id]}</p>
                    <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt=''/> {/*This will add item so we will do prev+1 */}
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt=""  />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem
