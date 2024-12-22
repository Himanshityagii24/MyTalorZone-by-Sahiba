import React from 'react';
import CrownIcon from '../Assets/Crown.png';
import { Link } from 'react-router-dom';
import SellPage from './SellPage';

const SellerDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="w-64 h-screen bg-gray-100 flex flex-col fixed">
        {/* Header Section */}
        <div className="flex items-center justify-center p-4">
          <img src={CrownIcon} alt="Crown" className="h-12 w-12 mr-2" />
          <h1 className="text-3xl font-[Caveat] text-black">MyTailorZone</h1>
        </div>

        {/* Sidebar Menu */}
        <ul className="space-y-4 flex-grow px-4">
          <li className="text-lg text-black hover:bg-pink-300 hover:rounded-lg py-2 px-4">
            <Link to="/sellerdashboard" className="block">Sell</Link>
          </li>
          <li className="text-lg text-black hover:bg-pink-300 hover:rounded-lg py-2 px-4">
            <Link to="#orders" className="block">Orders</Link>
          </li>
          <li className="text-lg text-black hover:bg-pink-300 hover:rounded-lg py-2 px-4">
            <Link to="#customers" className="block">Customers</Link>
          </li>
        </ul>

        {/* Bottom Menu */}
        <ul className="px-4 pb-4">
          <li className="text-lg text-black  bg-pink-300 hover:bg-pink-400 hover:rounded-lg py-2 px-4 rounded-3xl flex items-center justify-center">
            <Link to="#profile" className="block text-white">Profile</Link>
          </li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 bg-white p-8 pl-72"> {/* Added left padding to avoid overlap with the fixed sidebar */}
        
        {/* Render the SellPage */}
        <SellPage />
      </div>
    </div>
  );
};

export default SellerDashboard;
