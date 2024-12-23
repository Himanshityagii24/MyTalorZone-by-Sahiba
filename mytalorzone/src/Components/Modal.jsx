import React, { useState } from "react";

const Modal = ({ isOpen, closeModal, cartItems = [] }) => {
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.name]: 1 }), {})
  );

  const handleQuantityChange = (itemName, increment) => {
    setQuantities((prev) => ({
      ...prev,
      [itemName]: Math.max(1, (prev[itemName] || 1) + increment),
    }));
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      const quantity = quantities[item.name] || 1;
      return total + price * quantity;
    }, 0);

    return total.toFixed(2);
  };

  const handleBuyNow = () => {
    // Add your "Buy Now" functionality here, such as navigating to a checkout page
    alert("Proceeding to purchase!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-2xl justify-center font-caveat mb-4">Cart Items</h2>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={closeModal}
        >
          &times;
        </button>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mb-4">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between mb-4"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-pink-500">{item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item.name, -1)}
                      >
                        -
                      </button>
                      <span className="mx-2 text-lg">
                        {quantities[item.name] || 1}
                      </span>
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item.name, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-bold text-pink-500">
                ${calculateTotalPrice()}
              </span>
            </div>
            <button
              className="mt-4 w-full px-4 py-2 bg-pink-400 font-caveat text-white rounded hover:bg-pink-500"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
