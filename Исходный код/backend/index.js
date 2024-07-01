import express from "express";

import mongoose from "mongoose";

import multer from "multer";

import cors from "cors";

import bcrypt from "bcrypt";

import { registerValidation } from "./validation/auth.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.6t3ilac.mongodb.net/music?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("DB Connected!"))
.catch(err => console.log(err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Да-да, это мой диплом!");
});
app.post("/auth/register", UserController.register)


app.post("/auth/login", UserController.login)
app.get("/auth/me", checkAuth, UserController.getMe)

app.post('/api/user/updateName', async (req, res) => {
    const { userId, name } = req.body;

    try {
        if (!userId || !name) {
            return res.status(400).json({ message: 'Invalid request data' });
        }

        const user = await User.findByIdAndUpdate(userId, { name }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(3000, (err) => {
    if (err) {
        return console.log('error');
    }

    console.log("Listening on port 3000");
});