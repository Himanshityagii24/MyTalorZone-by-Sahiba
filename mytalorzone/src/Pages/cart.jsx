import React from 'react'
import { Sidebar } from '../Components/Sidebar'
import bgImage from '../Assets/bg1.jpeg'

const Cart = () => {
  return (
    <div style={{ 
      display: 'flex', 
      backgroundImage: `url(${bgImage})`, 
      backgroundSize: '50%', 
      backgroundPosition: 'center', 
      height: '100vh' 
    }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
       
      </div>
    </div>
  )
}

export default Cart;
