import React, { useState, useEffect } from 'react';
import { Sidebar } from '../Components/Sidebar';
import bg1 from '../Assets/bg1.jpeg';
import cartIcon from '../Assets/pink-cart.png';
import dress1 from '../Assets/dress1.jpeg';
import dress2 from '../Assets/dress2.jpeg';
import dress3 from '../Assets/dress3.jpeg';
import dress4 from '../Assets/dress4.jpeg';
import dress5 from '../Assets/dress5.jpeg';
import dress6 from '../Assets/dress6.jpeg';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '../Components/Modal';

// DraggableCard Component
const DraggableCard = ({ dress }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'DRESS',
    item: dress,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const preventImageDrag = (e) => e.preventDefault();

  return (
    <div
      ref={drag}
      className={`card bg-white shadow-lg rounded-lg p-3 max-w-xs mx-auto w-64 cursor-move transition-all duration-300 ease-in-out ${
        isDragging ? 'scale-110 opacity-80' : ''
      }`}
    >
      <img
        src={dress.img}
        alt={dress.name}
        className="w-full h-36 width-80px height-200px rounded-md pointer-events-none"
        onDragStart={preventImageDrag}
      />
      <h3 className="text-lg font-semibold mt-2 select-none">{dress.name}</h3>
      <p className="text-pink-500 select-none">{dress.price}</p>
    </div>
  );
};

// Main Component
const DressContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [emojiEffect, setEmojiEffect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dresses = [
    { img: dress1, name: 'Dress 1', price: '$49.99' },
    { img: dress2, name: 'Dress 2', price: '$59.99' },
    { img: dress3, name: 'Dress 3', price: '$69.99' },
    { img: dress4, name: 'Dress 4', price: '$79.99' },
    { img: dress5, name: 'Dress 5', price: '$89.99' },
    { img: dress6, name: 'Dress 6', price: '$99.99' },
    { img: dress4, name: 'Dress 7', price: '$79.99' },
    { img: dress5, name: 'Dress 8', price: '$89.99' },
    { img: dress6, name: 'Dress 9', price: '$99.99' },
    { img: dress4, name: 'Dress 10', price: '$79.99' },
    { img: dress5, name: 'Dress 11', price: '$89.99' },
    { img: dress6, name: 'Dress 12', price: '$99.99' },
  ];

  const playSound = () => {
    try {
      const sound = new Audio(require('../Assets/success.mp3'));
      sound.play().catch((e) => console.log('Sound playback failed:', e));
    } catch (error) {
      console.log('Sound playback error:', error);
    }
  };

  const showEmojiEffect = () => {
    setEmojiEffect(true);
    setTimeout(() => setEmojiEffect(false), 1500);
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'DRESS',
    drop: (item) => {
      if (!cartItems.some((cartItem) => cartItem.name === item.name)) {
        setCartItems((prevItems) => [...prevItems, item]);
        showEmojiEffect();
        playSound();
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div
      className="flex flex-col lg:flex-row h-screen"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: '50%',
        backgroundPosition: 'center',
      }}
    >
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar for smaller screens */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50">
          <Sidebar />
        </div>
      )}

      {/* Menu Bar for smaller screens */}
      <div className="lg:hidden bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-100">MyTalorZone</h2>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMenuOpen ? 'Close' : 'Open'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:pl-96 lg:pr-96">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {dresses.map((dress, index) => (
            <DraggableCard key={index} dress={dress} />
          ))}
        </div>
      </div>

      {/* Cart Drop Area */}
      <div
        ref={drop}
        className={`fixed right-0 top-0 h-full w-full lg:w-96 flex flex-col items-center justify-center bg-white bg-opacity-70 ${
          isOver ? 'border-4 border-pink-500' : ''
        }`}
        onClick={toggleModal}
      >
         <span className="text-pink-500 font-caveat text-4xl mb-4 text-center select-none">
          Drag and drop your items here!
        </span>
        <img src={cartIcon} alt="Cart Icon" className="pointer-events-none" />
        {emojiEffect && <span className="text-6xl">✅</span>}
        <span className="text-pink-500 font-caveat text-4xl mb-4 text-center select-none">
          Click on Cart to view your items!
        </span>
      </div>

      <Modal isOpen={isModalOpen} closeModal={toggleModal} cartItems={cartItems} />
    </div>
  );
};

const Dress = () => (
  <DndProvider backend={HTML5Backend}>
    <DressContent />
  </DndProvider>
);

export default Dress;
