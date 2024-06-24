import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
// import MyOrders from './pages/MyOrders/MyOrders'
// import { ToastContainer } from 'react-toastify';
// import Verify from './pages/Verify/Verify'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)

  return ( // We will first check if showLogin is true o false.If its true we will return login popup form else we will return the fragment.
    <> 
    {/* <ToastContainer/> */}
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>} 
      <div>
        <Navbar setShowLogin={setShowLogin}/> {/*We will pass setShowLogin as a prop to Navbar and then destructure it in Navbar component and link it with sign in button*/}
        <Routes>
        <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order' element={<PlaceOrder />}/>
          {/* <Route path='/myorders' element={<MyOrders />}/> */}
          {/* <Route path='/verify' element={<Verify />}/> */}
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
