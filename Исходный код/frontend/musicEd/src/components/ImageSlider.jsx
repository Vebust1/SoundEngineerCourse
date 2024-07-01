// src/components/ImageSlider.jsx
import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';

const images = [
  '/homeScreen.jpg',
  '/homeScreen2.png',
  '/homeScreen3.png',
];

const ImageSlider = () => {
    const [index, setIndex] = useState(0);
  
    const transitions = useTransition(index, {
      key: index,
      from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
      leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    });
  
    const nextImage = () => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevImage = () => {
      setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
        <button
          onClick={prevImage}
          className="absolute left-0 ml-4 bg-[#8C82FC] text-white p-2 rounded-full focus:outline-none z-10"
        >
          &lt;
        </button>
        <div className="flex items-center justify-center overflow-hidden">
          {transitions((style, i) => (
            <animated.img
              src={images[i]}
              alt={`Image ${i}`}
              style={{ ...style, position: 'absolute' }}
              className="rounded-lg shadow-lg"
            />
          ))}
        </div>
        <button
          onClick={nextImage}
          className="absolute right-0 mr-4 bg-[#8C82FC] text-white p-2 rounded-full focus:outline-none"
        >
          &gt;
        </button>
      </div>
    );
  };
  
  export default ImageSlider; // Экспортируем компонент как default
