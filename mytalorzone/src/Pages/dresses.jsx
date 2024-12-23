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

  const preventImageDrag = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={drag}
      className={`card bg-white shadow-lg rounded-lg p-3 max-w-xs mx-auto w-64 cursor-move transition-all duration-300 ease-in-out ${isDragging ? 'scale-110 opacity-80' : ''}`}
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Sound Effect
  const playSound = () => {
    try {
      const sound = new Audio(require('../Assets/success.mp3'));
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
      console.log('Item dropped:', item);
      if (!cartItems.some((cartItem) => cartItem.name === item.name)) {
        setCartItems((prevItems) => {
          const updatedItems = [...prevItems, item];
          console.log('Updated cart items:', updatedItems);
          return updatedItems;
        });
        showEmojiEffect();
        playSound();
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Dresses Array
  const dresses = [
    { img: dress1, name: 'Dress 1', price: '$49.99' },
    { img: dress2, name: 'Dress 2', price: '$59.99' },
    { img: dress3, name: 'Dress 3', price: '$69.99' },
    { img: dress4, name: 'Dress 4', price: '$79.99' },
    { img: dress5, name: 'Dress 5', price: '$89.99' },
    { img: dress6, name: 'Dress 6', price: '$99.99' },
  ];

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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
      <Sidebar />
      <div className="flex-1 p-4 pl-96 pr-96">
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto max-h-9">
          {dresses.map((dress, index) => (
            <DraggableCard key={index} dress={dress} />
          ))}
        </div>
      </div>

      <div
        ref={drop}
        className={`fixed right-0 top-0 h-full w-96 flex flex-col items-center justify-center bg-white bg-opacity-50 ${
          isOver ? 'border-4 border-pink-500' : ''
        }`}
        onClick={toggleModal}
      >
        <span className="text-pink-500 font-caveat text-6xl mb-4 text-center select-none">
          Drag and drop your items here!
        </span>
        <img
          src={cartIcon}
          alt="Cart Icon"
          className="cursor-pointer pointer-events-none"
          style={{ width: '100%', height: '70%' }}
        />
        <span className="text-pink-500 font-caveat text-4xl mb-4 text-center select-none">
          Click on Cart to view your items!
        </span>
        {emojiEffect && <span className="text-6xl">✅</span>}
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={toggleModal}
        cartItems={cartItems}
      />
    </div>
  );
};

const Dress = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DressContent />
    </DndProvider>
  );
};

export default Dress;