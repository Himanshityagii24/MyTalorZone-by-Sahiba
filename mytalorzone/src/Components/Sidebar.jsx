import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import CrownIcon from '../Assets/Crown.png';
import UserIcon from '../Assets/user.png';

 // Import the user icon image

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 flex flex-col fixed top-0 left-0">
      <div className="flex items-center justify-center p-4">
        <img src={CrownIcon} alt="Crown" className="h-12 w-12 mr-2" />
        <h1 className="text-3xl font-[Caveat] text-black">MyTailorZone</h1>
      </div>
      
      <ul className="space-y-4 flex-grow px-4">
      <li className="text-lg text-black hover:bg-pink-300 hover:rounded-3xl py-2 px-4">
          <a href="/landingpage" className="block">Home</a>
        </li>
        <li className="text-lg text-black hover:bg-pink-300 hover:rounded-3xl py-2 px-4">
          <a href="/dress" className="block">Dresses</a>
        </li>
        <li className="text-lg text-black hover:bg-pink-300 hover:rounded-3xl py-2 px-4">
          <a href="#blouses" className="block">Blouses</a>
        </li>
        <li className="text-lg text-black hover:bg-pink-300 hover:rounded-3xl py-2 px-4">
          <a href="#shirts" className="block">Shirts</a>
        </li>
        <li className="text-lg text-black hover:bg-pink-300 hover:rounded-3xl py-2 px-4">
          <a href="#denim" className="block">Denim</a>
        </li>
        <li className="text-lg text-black hover:bg-pink-300 hover:rounded-3xl py-2 px-4">
          <a href="#trousers" className="block">Trousers</a>
        </li>
       
      </ul>
      
      <ul className="px-4 pb-4">
        <li className="text-lg text-black hover:bg-pink-300 hover:rounded-3xl py-2 px-4">
          <a href="/cart" className="block">Cart</a>
        </li>
        <li className="text-lg text-black hover:bg-pink-300 hover:rounded-lg py-2 px-4">
          <a href="#orders" className="block">Orders</a>
        </li>
      </ul>
      
      {/* Profile Link with react-router Link and user icon */}
      <div>
        <ul className="px-4 pb-4">
          <li className="text-lg text-black bg-pink-300 hover:bg-pink-400 hover:rounded-3xl py-2 px-4 rounded-3xl flex items-center justify-center">
            <Link to="#profile" className="block text-white flex items-center">
              {/* User Icon */}
              <img src={UserIcon} alt="User" className="h-6 w-6 mr-2" />
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
