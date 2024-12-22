import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Pages/Main';
import LandingPage from './Pages/User-dashboard';
import SignupUser from './Pages/Signup-user';
import SignupSeller from './Pages/Signup-seller';
import Login from './Pages/Login';
import SellerDashboard from './Pages/SellerDashboard';
import SellPage from './Pages/SellPage';
import Dress from './Pages/dresses';
import Cart from './Pages/cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/signupseller" element={<SignupSeller />} />
        <Route path="/signupuser" element={<SignupUser />} />
        <Route path="/sellpage" element={ <SellPage/>} />
        <Route path="/dress" element={ <Dress/>} />  
        <Route path="/cart" element={ <Cart/>} />         
       
        <Route path="/sellerdashboard" element={<SellerDashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
