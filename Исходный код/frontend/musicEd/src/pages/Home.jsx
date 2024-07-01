import React from 'react'
import axios from '../axios';
import ImageSlider from '../components/ImageSlider';

const Home = () => {
  return (
    <div className="p-6 text-white text-center">
      <h1 className="text-4xl font-bold text-white mb-4">
        Добро пожаловать на наш сайт по обучению звукорежиссуре
      </h1>
      <p className="mb-4">
        Здесь вы найдете всю необходимую информацию для того, чтобы стать профессиональным звукорежиссером.
        <br />
        Мы предлагаем курсы, статьи и практические задания для того, чтобы вы могли улучшить свои навыки.
      </p>
      <p>
        Начните с изучения основ звукорежиссуры, перейдите к сведениям музыки и узнайте, как правильно записывать аудиофайлы.
        Мы также предлагаем теоретические материалы по звуку.
      </p>
      <div className='flex items-center justify-center'>
        {/* <img className='rounded-xl my-10 ' src='./homeScreen.jpg' alt='homeScreen' width={800}/> */}
      </div>
      <ImageSlider />
    </div>
  );
};

export {Home};