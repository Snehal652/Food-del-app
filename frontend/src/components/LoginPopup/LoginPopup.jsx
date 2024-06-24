import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
// import { toast } from 'react-toastify'


const LoginPopup = ({setShowLogin}) => {

    const {url,setToken,loadCartData} = useContext(StoreContext); //We will use this url for login
    const [currState, setCurrState] = useState("Login")

    //Intergrating login & signup with backend ->
    //1)First we will create a state variable to store user name email and password.
    const [data,setData] = useState({  
        name:"",
        email:"",
        password:""
    })
    //2)Then we create an onChangeHandler that will pick the data from input field and store it in the state variable.
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value})) //...data means previous value so this statement means we will change the previous data with the new data.
    }
    //3)After this we will link the onChangeHandler with the input fields
    //4)We will verify it using useEffect
    // useEffect(()=>{
    //     console.log(data);
    // },[data])
    
    //5)For User login we will create one function called onLogin and link this function with form tag
    const onLogin = async(event) => {
        event.preventDefault();
        //Here we will create the logic to call the API and to call api we need axios
        let newUrl = url;
        if(currState=="Login"){ //If the state is login then we call the api with url http://localhost:4000/api/user/login and else if the state is signup we will call the api http://localhost:4000/api/user/signup
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data);

        if(response.data.success){ //If we are logged in succesfully we will get a token and we will save that token in a state variable created in Storecontext 
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token) //saving the token in local storage
            setShowLogin(false) //for hiding the login popup/page after succesful login
            loadCartData({token:response.data.token})
        }
        else{
            // toast.error(response.data.message)
        }

    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2> {/*Here we will display login or Signup state */}
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required />}  
                <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your Email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your Password' required />
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, I agree to the terms of use and privacy policy.</p>
            </div>
            {currState==="Login"? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p> 
                                : <p>Already have an account? <span onClick={()=>setCurrState("Login") }>Login Here</span></p>}
        </form>
      
    </div>
  )
}

export default LoginPopup
