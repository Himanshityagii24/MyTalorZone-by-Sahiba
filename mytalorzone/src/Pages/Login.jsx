import React from 'react';
import LoginImage from '../Assets/LoginImage.jpeg';
import CrownIcon from '../Assets/Crown.png';
const Login = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        {/* Container */}
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
          {/* Image Section */}
          <div className="hidden md:block md:w-1/2">
            <img
              src={LoginImage}
              alt="Login Visual"
              className="h-full w-full object-cover rounded-l-lg"
            />
          </div>
  
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 relative ">
            {/* Crown Icon */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
              <img src={CrownIcon} alt="Crown" className="h-12 w-12" />
            </div>
  
            {/* Title */}
            <h1 className="text-5xl font-[Caveat] text-black mt-12 mb-8 text-center">
              MyTalorZone
            </h1>
  
            {/* Form */}
            <form className="space-y-6">
              {/* Email */}
              <div className="space-y-6">
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="Enter your email"
                />
              </div>
  
              {/* Password */}
              <div className="space-y-10">
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="Enter your password"
                />
              </div>
  
              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2 h-4 w-4 text-pink-300 focus:ring-pink-300 border-gray-300 rounded"
                />
                <label className="text-gray-700 text-sm" htmlFor="remember">
                  Remember me
                </label>
              </div>
  
              {/* Login Button */}
              <button
                type="submit"
                className="bg-pink-300 text-white font-bold py-3 px-4 rounded w-full hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 mt-4"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default Login;
