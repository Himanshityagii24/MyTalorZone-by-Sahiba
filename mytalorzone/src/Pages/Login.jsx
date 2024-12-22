import React, { useState } from 'react';
import * as ReactRouter from 'react-router-dom';
import LoginImage from '../Assets/LoginImage.jpeg';
import CrownIcon from '../Assets/Crown.png';

const Login = () => {
  const navigate = ReactRouter.useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (role) => {
    // Replace with backend authentication logic
    if (role === 'Seller') {
      navigate('/sellerdashboard');
    } else {
      navigate('/landingpage');
    }
  };

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

        {/* Login Section */}
        <div className="w-full md:w-1/2 p-8 relative text-center">
          {/* Crown Icon */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
            <img src={CrownIcon} alt="Crown" className="h-12 w-12" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-[Caveat] text-black mt-12 mb-10">
            MyTailorZone
          </h1>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Email Field */}
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="text-left">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Buttons */}
            <div className="space-y-4 mt-6">
              <button
                type="button"
                className="bg-pink-300 text-white font-bold py-3 px-6 rounded w-full hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                onClick={() => handleSubmit('Seller')}
              >
                Login as Seller
              </button>
              <p className="flex justify-center">OR</p>
              <button
                type="button"
                className="bg-pink-300 text-white font-bold py-3 px-6 rounded w-full hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                onClick={() => handleSubmit('User')}
              >
                Login as User
              </button>
            </div>
          </form>

          {/* Signup Link */}
          <p className="text-gray-500 mt-6">
            Don't have an account?{' '}
            <span
              className="text-pink-300 cursor-pointer hover:underline"
              onClick={() => navigate('/')}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
