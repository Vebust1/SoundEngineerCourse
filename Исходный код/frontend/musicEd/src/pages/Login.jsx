import React from 'react'
import { Link } from 'react-router-dom';
import {BiUser} from 'react-icons/bi'
import { AiOutlineUnlock } from 'react-icons/ai'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const {
        reset,
        register,
        handleSubmit,
        setError, 
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserData(values))

        if (!data.payload) {
            return alert('Не удалось авторизироваться!')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }

    }

    if (isAuth) {
        return <Navigate to='/' />
    }

  return (
    <div className='flex justify-center items-center bg-cover py-14 min-h-screen'>
        <div className='bg-gray-500 border border-slate-600 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative'>
            <h1 className='text-4xl  text-white text-center mb-6'>Авторизация</h1>
            <form onSubmit={handleSubmit(onSubmit)} action=''>
            <div className='relative my-8'>
                <input {...register('email', { required: 'Укажите почту' })} type="email" className='block w-72 py-2.3 px-0 text-white text-sm bg-transparent border-0 border-b-2 border-gray-300
                 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder-gray' placeholder="" />
                <label htmlFor="" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Ваш Email</label>
                <BiUser className='absolute top-1 right-4' />
            </div>
            <div className='relative my-8'>
                <input {...register('password', { required: 'Укажите пароль' })} type="password" className='block w-72 py-2.3 px-0 text-white text-sm bg-transparent border-0 border-b-2 border-gray-300
                 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder-gray' placeholder="" />
                <label htmlFor="" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Ваш Пароль</label>
                <AiOutlineUnlock className='absolute top-1 right-4' />
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <input type='checkbox' name='' id='' />
                    <label htmlFor="Запомнить меня">Запомнить меня</label>
                </div>
                <Link to={'/auth/register'} className='text-[#8C82FC]'>Забыли Пароль?</Link>
            </div>
            <button className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-[#8C82FC] hover:bg-[#8C82FC] hover:text-white py-2 transition-colors duration-300' type='submit'>Войти</button>
            <div>
                <span className='m-4'>Нет аккаунта? <Link className='text-[#8C82FC]' to={'/auth/register'}>Создать аккаунт</Link></span>
            </div>
            </form>
        </div>    
    </div>
  )
}

export {Login};