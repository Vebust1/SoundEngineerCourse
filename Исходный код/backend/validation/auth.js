import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Некорректный email').isEmail(),
    body('password', 'Минимальная длина пароля 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Некорректная ссылка на аватарку').optional().isURL(),
]

