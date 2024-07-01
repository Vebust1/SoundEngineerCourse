// src/redux/slices/auth.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await axios.post('http://localhost:3000/auth/login', params);
    if (data.token) {
        window.localStorage.setItem('token', data.token);
    }
    return data;
});

// Добавьте новый thunk для регистрации
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('http://localhost:3000/auth/register', params);
    if (data.token) {
        window.localStorage.setItem('token', data.token);
    }
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.get('http://localhost:3000/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
    isAuth: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.isAuth = false;
            window.localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
                state.data = null;
                state.isAuth = false;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
                state.isAuth = true;
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.status = 'error';
                state.data = null;
                state.isAuth = false;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
                state.isAuth = false;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
                state.isAuth = true;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'error';
                state.data = null;
                state.isAuth = false;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
                state.isAuth = false;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
                state.isAuth = true;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null;
                state.isAuth = false;
            });
    }
});

export const { logout } = authSlice.actions;

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

