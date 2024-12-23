import React, { useState } from 'react';
import * as ReactRouter from 'react-router-dom';
import axios from 'axios'; 
import LoginImage from '../Assets/LoginImage.jpeg';
import CrownIcon from '../Assets/Crown.png';

const SignupUser = () => {
  const navigate = ReactRouter.useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        'https://my-talor-zone-by-sahiba-ldas.vercel.app/api/users/signup',
        requestBody
      );
      console.log('Signup successful:', response.data);
      // Navigate to the landing page after successful signup
      navigate('/landingpage');
    } catch (error) {
      console.error('Signup failed:', error);
      setError(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
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

        {/* Signup Section */}
        <div className="w-full md:w-1/2 p-8 relative text-center">
          {/* Crown Icon */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
            <img src={CrownIcon} alt="Crown" className="h-12 w-12" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-[Caveat] text-black mt-12 mb-10">MyTailorZone</h1>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your name"
              required
            />

            {/* Email Field */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your email"
              required
            />

            {/* Password Field */}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your password"
              required
            />

            {/* Phone Field */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your phone number"
              required
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-pink-300 text-white font-bold py-3 px-6 rounded w-full hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              Signup
            </button>
          </form>

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

export default SignupUser;
