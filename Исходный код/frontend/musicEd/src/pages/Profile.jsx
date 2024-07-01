// src/ProfilePage.js
import { useState } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuth } from '../redux/slices/auth';
import { selectStudyMaterials } from '../redux/slices/studyMaterials';
import axios from 'axios';

const ProfilePage = ({ isAuth, user, studyMaterials }) => {
    const [name, setName] = useState(user ? user.name : '');
    const [isEditing, setIsEditing] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSaveName = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/updateName', {
                userId: user._id,
                name,
            });

            // Здесь вы можете обновить состояние пользователя, если нужно
            // setState({ user: response.data });

            setIsEditing(false);
            alert('Имя успешно обновлено!');
        } catch (error) {
            console.error('Ошибка при обновлении имени:', error);
            alert('Ошибка при обновлении имени.');
        }
    };

    if (!isAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
            <p className="text-xl">
                Вы не авторизованы. Пожалуйста, <Link to="/auth/login" className="text-blue-500">войдите</Link>.
            </p>
        </div>
    );
}

if (!user) {
    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-xl">Загрузка данных...</p>
        </div>
    );
}

    return (
        <div className="flex flex-col md:flex-row p-5 min-h-screen">
            <div className="md:w-1/3 bg-white p-5 rounded-lg shadow-lg mb-5 md:mb-0">
                <h2 className="text-2xl font-bold mb-4">Личные данные</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Имя: {user.fullName}</label>
                </div>
                <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
                {/* Добавьте здесь другие личные данные пользователя */}
            </div>
            <div className="md:w-2/3 md:ml-5 bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Учебные материалы</h2>
                <ul className="list-disc pl-5">
                    {studyMaterials.map((material, index) => (
                        <li key={index} className="mb-2"><button>{material}</button></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuth: selectIsAuth(state),
    user: state.auth.data,
    studyMaterials: selectStudyMaterials(state),
});

export default connect(mapStateToProps)(ProfilePage);
