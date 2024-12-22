import React from 'react';
import * as ReactRouter from 'react-router-dom';
import LoginImage from '../Assets/LoginImage.jpeg';
import CrownIcon from '../Assets/Crown.png';

const Signup = () => {
  const navigate = ReactRouter.useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Container */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={LoginImage}
            alt="Visual Representation"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>

        {/* Signup Section */}
        <div className="w-full md:w-1/2 p-8 relative text-center">
          {/* Crown Icon */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
            <img src={CrownIcon} alt="Crown" className="h-12 w-12" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-[Caveat] text-black mt-12 mb-16">
            MyTailorZone
          </h1>

          {/* Signup Buttons */}
          <div className="space-y-4 mt-6">
            <button
              className="bg-pink-300 text-white font-bold py-3 px-6 rounded w-full hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
              onClick={() => navigate('/signupseller')}
            >
              Signup as Seller
            </button>
            <button
              className="bg-pink-300 text-white font-bold py-3 px-6 rounded w-full hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
              onClick={() => navigate('/signupuser')}
            >
              Signup as User
            </button>
          </div>

          {/* Login Link */}
          <p className="text-gray-500 mt-6">
            Already have an account?{' '}
            <span
              className="text-pink-300 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
