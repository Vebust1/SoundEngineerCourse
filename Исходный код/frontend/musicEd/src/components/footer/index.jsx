import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/mainLogo.svg'

export const Footer = () => {
  return (
    <footer className='bg-dark-gray py-20'>
    <div className='container'>
        <div className='flex gap-40'>
            <div className='max-w-xs px-20 font-weight-400'>
                <Link to='/'><img src={logo} alt="logo" /></Link>
                <p className='mt-4 text-white text-xl'>Подписывайтесь на наши соц-сети и наблюдайте за нами там</p>
                <input className='mt-3 bg-[#454545] flex py-3 px-4 rounded-xl border-[1px] border-[#454545] text-white focus:outline-none focus:border-[#FF7276] placeholder: italic' 
                type='text' placeholder='Введите свой email' />
                <button className='rounded-xl mt-3 bg-[#8C82FC] py-3 px-4'>Отправить</button>
            </div>
            <div>
                <div className='flex space-x-6 text-[#8C82FC]'>Перейти в</div>
                <ul className='text-white mt-3 '>
                    <li className='mt-3'><Link className='text-white text-lg' to='/'>Vk</Link></li>
                    <li className='mt-3'><Link className='text-white text-lg' to='/'>Telegram</Link></li>
                    <li className='mt-3'><Link className='text-white text-lg' to='/'>О нас</Link></li>
                    <li className='mt-3'><Link className='text-white text-lg' to='/'>Статьи</Link></li>
                    <li className='mt-3'><Link className='text-white text-lg' to='/'>Чат</Link></li>
                    <li className='mt-3'>© 2024 Все права защищены</li>
                </ul>
            </div>
        </div>
    </div>
    </footer>
  )
}
