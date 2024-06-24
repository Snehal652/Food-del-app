import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from "react-toastify"

const List = ({url}) => {

  
  const [list, setList] = useState([]); //First we will store all the data from the database into a state variable called list.
  //Now we will make an API call to fetch the list
  //const url = "http://localhost:4000"
  const fetchList = async() => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data);
    }
    else
    {
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add felx-col'>
    <p>All Foods List</p>
    <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {/*Now we will display the list by iterating using map method */}
      {list.map((item,index) => {
        return (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/`+item.image} alt=""/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className='cursor' onClick={()=>{removeFood(item._id)}}>X</p>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default List
