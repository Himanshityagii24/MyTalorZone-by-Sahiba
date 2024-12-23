import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const Modal = ({ isOpen, closeModal, cartItems = [], setCartItems }) => {
  // Initialize quantities state with data from localStorage or default values
  const [quantities, setQuantities] = useState(() => {
    const savedQuantities = localStorage.getItem('cartQuantities');
    if (savedQuantities) {
      const parsed = JSON.parse(savedQuantities);
      // Only keep quantities for items that are actually in the cart
      const filtered = {};
      cartItems.forEach(item => {
        if (parsed[item.name]) {
          filtered[item.name] = parsed[item.name];
        } else {
          filtered[item.name] = 1;
        }
      });
      return filtered;
    }
    // Initialize default quantities
    return cartItems.reduce((acc, item) => {
      acc[item.name] = 1;
      return acc;
    }, {});
  });

  // Save quantities to localStorage when they change
  useEffect(() => {
    localStorage.setItem('cartQuantities', JSON.stringify(quantities));
  }, [quantities]);

  // Clean up quantities when cart items change
  useEffect(() => {
    setQuantities(prev => {
      const newQuantities = {};
      cartItems.forEach(item => {
        newQuantities[item.name] = prev[item.name] || 1;
      });
      return newQuantities;
    });
  }, [cartItems.length]); // Only run when the number of items changes

  const updateQuantity = (name, change) => {
    setQuantities(prev => {
      const newQuantity = Math.max(1, (prev[name] || 1) + change);
      return {
        ...prev,
        [name]: newQuantity
      };
    });
  };

  const removeItem = (itemName) => {
    setCartItems(prev => {
      const updatedItems = prev.filter(item => item.name !== itemName);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = quantities[item.name] || 1;
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * quantity);
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-96 bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <MdClose className="w-6 h-6" />
        </button>

        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Your cart is empty</p>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <span className="text-gray-700 font-semibold">{item.name}</span>
                        <span className="text-gray-500">{item.price}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => removeItem(item.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.name, -1)}
                          className="px-2 py-1 bg-gray-300 rounded-md text-xl font-semibold"
                        >
                          -
                        </button>
                        <span className="text-lg">{quantities[item.name] || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.name, 1)}
                          className="px-2 py-1 bg-gray-300 rounded-md text-xl font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <p className="text-gray-700">
                  Total Items: <span className="font-semibold">{cartItems.length}</span>
                </p>
                <p className="text-gray-700">
                  Total Quantity:{" "}
                  <span className="font-semibold">
                    {Object.values(quantities).reduce((acc, curr) => acc + curr, 0)}
                  </span>
                </p>
                <p className="text-gray-700 mt-2 text-xl">
                  Total Price:{" "}
                  <span className="font-semibold">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;