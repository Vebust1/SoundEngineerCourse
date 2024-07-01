import React from 'react'
import logo from '../../images/mainLogo.svg'
import { NavItems } from '../nav-items'
import { Button } from '../button'
import { Link } from 'react-router-dom'
import { logout, selectIsAuth } from '../../redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux'


export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  }
  return (
    <header className='flex items-center mx-3'>
      <Link to="/">
      <img className='h-16 w-40 cursor-pointer' src={logo} alt="logo" />
      </Link>
      <nav className='flex space-x-6 ml-8 items-center'>
        <NavItems redir="articles" text='Учебные материалы'/>
        <NavItems redir="chat" text='Чат' /> 
        <NavItems redir="aboutus" text='О нас' /> 
        <NavItems redir="test" text='Тест знаний'/>
        <NavItems redir="audiotest" text='Аудио тесты'/> 
      </nav>
      <div className='ml-auto flex space-x-5'>
        {isAuth ? (
          <>
            <Link to ="/profile">
              <Button>Мой профиль</Button>
            </Link>
            <Link to ="/">
              <button className="text-almost-white rounded-lg font-bold py-2 px-4 mx-0 hover:bg-transparent hover:text-almost-black border-2 border-almost-black" onClick={handleLogout} hasBorder= { true }>Выйти из аккаунта</button>
            </Link>
          </>
        ) : (
          <>
            <Link to ="/auth/login">
              <Button>Войти</Button>
            </Link>
            <Link to ="/auth/register">
              <Button hasBorder= { true }>Зарегестрироваться</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
