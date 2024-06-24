import React, {useContext} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
       <h2>Top dishes near you</h2>
       <div className="food-display-list">
        {food_list.map((item,index) => {
          if(category==="All" || category===item.category) { //This is for filtering. That is the state of category if "ALL" it will display all items else if the state="item-category" it will display food items of that category only.
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          } 
        })}

        {/* {food_list.map((item)=>{
          if (category==="All" || category===item.category) {
            return <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/>
          }
        })}         */}

       </div>
    </div>
  )
}

export default FoodDisplay
