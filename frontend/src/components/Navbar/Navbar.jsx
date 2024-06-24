import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("menu");
    const{getTotalCartAmount,token, setToken} = useContext(StoreContext); //This is for showing dot over bag icon only when we have chosen some item otherwise dot will not be shown.

    //logout function will called when user clicks on the logout button
    //For logging out user we will remove the token from locak storage and
    //After logging out we will send the user to Home page using useNavigate
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

  return (
    <div className='navbar'>
        <Link to='/'><img src = {assets.logo} alt="" className='logo'/></Link>
        <ul className="navbar-menu">
        {/* if our state ("menu") is home we will provide li with a classname that is "active" else it will be a given a classname of empty string */}
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>  
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
        </ul>

        <div className="navbar-right">
            <img src={assets.search_icon} alt=""/>
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt=''/></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div> {/*We have given dynamic class to the dot over that bag icon. If we have chosen some item then only the dot will be shown otherwise it will not be shown */}
            </div>
            {!token?<button onClick={() => setShowLogin(true)}>Sign In</button> //If the token is not available the show signIn button else if token available then show the profile icon
                   :<div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className='navbar-profile-dropdown'>
                    <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
                    <hr />
                    <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
                    </ul>
                    </div>
            }

            
        </div>
    </div>
  )
}

export default Navbar
