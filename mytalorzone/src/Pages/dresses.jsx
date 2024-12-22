import React, { useState } from 'react';
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

// DraggableCard Component
const DraggableCard = ({ dress }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'DRESS',
    item: dress,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const preventImageDrag = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={drag}
      className={`card bg-white shadow-lg rounded-lg p-3 max-w-xs mx-auto w-64 cursor-move transition-all duration-300 ease-in-out ${
        isDragging ? 'scale-110 opacity-80' : '' // Scale and opacity change when dragging
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

const DressContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [emojiEffect, setEmojiEffect] = useState(false);

  // Handle Sound Effect
  const playSound = () => {
    try {
      const sound = new Audio(require('../Assets/success.mp3')); // Correct path to the sound file
      sound.play().catch((e) => console.log('Sound playback failed:', e));
    } catch (error) {
      console.log('Sound playback error:', error);
    }
  };

  // Emoji Effect Logic
  const showEmojiEffect = () => {
    setEmojiEffect(true);
    setTimeout(() => setEmojiEffect(false), 1500);
  };

  // Cart Drop Target Logic
  const [{ isOver }, drop] = useDrop({
    accept: 'DRESS',
    drop: (item) => {
      if (!cartItems.includes(item.name)) {
        setCartItems((prevItems) => [...prevItems, item.name]);
        showEmojiEffect();
        playSound(); // Sound will play when an item is dropped into the cart
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Dresses Array
  const dresses = [
    { img: dress1, name: 'Dress 1', price: '$49.99' },
    { img: dress2, name: 'Dress 2', price: '$59.99' },
    { img: dress3, name: 'Dress 3', price: '$69.99' },
    { img: dress4, name: 'Dress 4', price: '$79.99' },
    { img: dress5, name: 'Dress 5', price: '$89.99' },
    { img: dress6, name: 'Dress 6', price: '$99.99' },
  ];

  return (
    <div
      className="flex relative"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: '50%',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 pl-96 pr-96">
        {/* Product Cards */}
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto max-h-9">
          {dresses.map((dress, index) => (
            <DraggableCard key={index} dress={dress} />
          ))}
        </div>
      </div>

      {/* Cart Section - Fixed to the right side */}
      <div
        ref={drop}
        className={`fixed right-0 top-0 h-full w-96 flex flex-col items-center justify-center bg-white bg-opacity-50 ${
          isOver ? 'border-4 border-pink-500' : ''
        }`}
      >
        <span className="text-pink-500 font-caveat text-6xl mb-4 text-center select-none">
          Add your items here!
        </span>
        <img
          src={cartIcon}
          alt="Cart Icon"
          className="cursor-pointer pointer-events-none"
          style={{ width: '100%', height: '70%' }}
        />
        {emojiEffect && <span className="text-6xl">✅</span>}

     
      </div>
    </div>
  );
};

// Wrap the component with DndProvider
const Dress = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DressContent />
    </DndProvider>
  );
};

export default Dress;
