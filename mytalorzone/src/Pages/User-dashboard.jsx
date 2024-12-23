import React, { useState, useEffect } from 'react';
import { Sidebar } from '../Components/Sidebar';
import Banner from '../Assets/Fashio.jpeg';
import Bangif from '../Assets/Banner.gif';
import banner3 from '../Assets/banner2.jpeg';
import banner4 from '../Assets/banner4.jpeg';
import banner5 from '../Assets/banner5.jpeg';
import banner6 from '../Assets/Shein Banner.jpeg';
import pink from '../Assets/pink.jpeg';
import green from '../Assets/green.jpeg';
import black from '../Assets/black.jpeg';
import denim1 from '../Assets/denim1.jpeg';
import denim2 from '../Assets/denim2.jpeg';
import denim3 from '../Assets/denim3.jpeg';
import season1 from '../Assets/season1.jpeg';
import season2 from '../Assets/season2.jpeg';
import season4 from '../Assets/season4.jpeg';

const banners = [Banner, Bangif, banner3, banner4, banner5, banner6];

const LandingPage = () => {
  const [currentPair, setCurrentPair] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [images, setImages] = useState([pink, green, black]); // Initial images for "Shop By Color Theme"
  const [fade, setFade] = useState(false); // For smooth transitions
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = ['Shop By Color Theme', 'Shop Denim', 'Shop By Season'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPair((prevPair) => (prevPair + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSectionChange = (index) => {
    setFade(true); // Trigger fade-out
    setTimeout(() => {
      if (index === 1) {
        // Shop Denim
        setImages([denim1, denim2, denim3]);
      } else if (index === 2) {
        // Shop By Season
        setImages([season1, season2, season4]);
      } else if (index === 0) {
        // Shop By Color Theme
        setImages([pink, green, black]);
      }
      setFade(false); // Trigger fade-in after images are updated
    }, 500); // Delay to match fade-out duration
    setActiveSection(index);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar for smaller screens */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} fixed inset-0 bg-gray-800 bg-opacity-50 z-50`}>
        <Sidebar />
      </div>

      {/* Menu bar for smaller screens */}
      <div className="lg:hidden bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <h2
          className="text-3xl font-semibold text-gray-100"
          style={{ fontFamily: 'Caveat' }}
        >
          MyTalorZone
        </h2>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMenuOpen ? 'Close' : 'Open'}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 text-gray-800 p-4">
          <ul>
            {sections.map((section, index) => (
              <li
                key={index}
                className="py-2 cursor-pointer hover:text-gray-500"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSectionChange(index);
                }}
              >
                {section}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden lg:ml-64 px-4">
        {/* Banner Carousel */}
        <div className="w-full">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentPair * 33.33}%)`,
              width: '300%',
            }}
          >
            {/* First Pair */}
            <div className="flex w-1/3">
              <div className="w-1/2 px-1">
                <img
                  src={banners[0]}
                  alt="Banner 1"
                  className="w-full h-[250px] object-cover shadow-md"
                />
              </div>
              <div className="w-1/2 px-1">
                <img
                  src={banners[1]}
                  alt="Banner 2"
                  className="w-full h-[250px] object-cover shadow-md"
                />
              </div>
            </div>

            {/* Second Pair */}
            <div className="flex w-1/3">
              <div className="w-1/2 px-1">
                <img
                  src={banners[2]}
                  alt="Banner 3"
                  className="w-full h-[250px] object-cover shadow-md"
                />
              </div>
              <div className="w-1/2 px-1">
                <img
                  src={banners[3]}
                  alt="Banner 4"
                  className="w-full h-[250px] object-cover shadow-md"
                />
              </div>
            </div>

            {/* Third Pair */}
            <div className="flex w-1/3">
              <div className="w-1/2 px-1">
                <img
                  src={banners[4]}
                  alt="Banner 5"
                  className="w-full h-[250px] object-cover shadow-md"
                />
              </div>
              <div className="w-1/2 px-1">
                <img
                  src={banners[5]}
                  alt="Banner 6"
                  className="w-full h-[250px] object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Section Title */}
        <div className="w-full flex justify-center mt-6">
          <h2
            className="text-3xl font-semibold text-gray-600"
            style={{ fontFamily: 'Caveat' }}
          >
            {sections[activeSection]}
          </h2>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-2">
          {sections.map((_, index) => (
            <button
              key={index}
              className={`h-2.5 w-2.5 rounded-full mx-1 transition-colors ${
                activeSection === index ? 'bg-gray-700' : 'bg-gray-300'
              }`}
              onClick={() => handleSectionChange(index)}
            ></button>
          ))}
        </div>

        {/* New Grid Section */}
        <div
          className={`flex flex-col items-center mt-8 transition-opacity duration-500 ${
            fade ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-[300px] lg:h-[500px] object-cover shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
