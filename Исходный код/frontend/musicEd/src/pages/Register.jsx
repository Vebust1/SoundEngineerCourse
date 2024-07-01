import React from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../redux/slices/auth';

const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center bg-cover py-10 min-h-screen">
      <div className="bg-gray-500 border border-slate-700 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white text-center mb-6">Регистрация</h1>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="relative my-8">
            <input
              {...register('email', { required: 'Укажите почту' })}
              type="email"
              className="block w-72 py-2.3 px-0 text-white text-sm bg-transparent border-0 border-b-2 border-gray-300
              appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder-gray"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ваш Email
            </label>
            <BiUser className="absolute top-1 right-4" />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="relative my-8">
            <input
              {...register('password', { required: 'Укажите пароль' })}
              type="password"
              className="block w-72 py-2.3 px-0 text-white text-sm bg-transparent border-0 border-b-2 border-gray-300
              appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder-gray"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ваш Пароль
            </label>
            <AiOutlineUnlock className="absolute top-1 right-4" />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="relative my-8">
            <input
              {...register('fullName', { required: 'Укажите имя' })}
              type="text"
              className="block w-72 py-2.3 px-0 text-white text-sm bg-transparent border-0 border-b-2 border-gray-300
              appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder-gray"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ваше Имя
            </label>
            <AiOutlineUnlock className="absolute top-1 right-4" />
            {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
          </div>
          <button
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-[#8C82FC] hover:bg-[#8C82FC] hover:text-white py-2 transition-colors duration-300"
            type="submit"
          >
            Зарегистрироваться
          </button>
          <div>
            <span className="m-4">
              Уже есть аккаунт? <Link className="text-[#8C82FC]" to={'/auth/login'}>Войти</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Register };

