import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTshirt } from 'react-icons/fa';
import background from '../Assets/bg2.jpeg'; // Import the background image

const SellPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    quantityAvailable: '',
    imageURL: '',
    size: '',
    color: '',
    fabricType: '',
    brand: '',
    weight: '',
    shippingCost: '',
    estimatedDelivery: '',
    freeShipping: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox for free shipping
  const handleCheckboxChange = () => {
    setFormData({ ...formData, freeShipping: !formData.freeShipping });
  };

  // Submit product to be listed for sale
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Details:', formData);
    // Add product to the database (API call could be made here)
    navigate('/sellerdashboard');
  };

  // Reusable Input Field Component
  const InputField = ({ name, type = "text", placeholder, required = true }) => (
    <div className="text-left">
      {type === "select" ? (
        <select
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
          required={required}
        >
          <option value="">Select an option</option>
          {["Dresses", "Blouses", "Shirts", "Denim", "Trousers", "Accessories"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder={placeholder}
          rows="4"
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );

  return (
    <div
      className="flex items-center justify-center min-h-screen py-5"
      style={{
        backgroundImage: `url(${background})`, // Set the background image dynamically
        backgroundSize: '20%',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col bg-white shadow-lg rounded-lg w-full lg:w-3/4">

        {/* Top Section: Icon + Title */}
        <div className="w-full bg-pink-100 p-8 flex flex-col justify-center items-center">
          <FaTshirt className="text-pink-500 text-6xl mb-4" />
          <h1 className="text-4xl font-[Caveat] text-pink-500 text-center mb-4">Sell Your Product</h1>
        </div>

        {/* Form Section */}
        <div className="w-full p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              name="productName"
              placeholder="Enter product name"
            />

            <InputField
              name="description"
              type="textarea"
              placeholder="Enter product description"
            />

            <InputField
              name="category"
              type="select"
            />

            <InputField
              name="price"
              type="number"
              placeholder="Enter product price"
            />

            <InputField
              name="quantityAvailable"
              type="number"
              placeholder="Enter quantity available"
            />

            <InputField
              name="imageURL"
              placeholder="Enter image URL"
            />

            <InputField
              name="size"
              placeholder="Enter size (e.g., S, M, L, XL)"
            />

            <InputField
              name="color"
              placeholder="Enter color"
            />

            <InputField
              name="brand"
              placeholder="Enter brand name"
            />

            <InputField
              name="shippingCost"
              type="number"
              placeholder="Enter shipping cost"
            />

            {/* Free Shipping Checkbox */}
            <div className="text-left flex items-center">
              <input
                type="checkbox"
                name="freeShipping"
                id="freeShipping"
                checked={formData.freeShipping}
                onChange={handleCheckboxChange}
                className="mr-2 h-4 w-4 text-pink-300 focus:ring-pink-300 border-gray-300 rounded"
              />
              <label htmlFor="freeShipping" className="text-gray-700 font-bold">
                Free Shipping
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="bg-pink-300 text-white font-bold py-3 px-6 rounded-2xl w-full hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
