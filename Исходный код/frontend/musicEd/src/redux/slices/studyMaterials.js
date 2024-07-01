// src/slices/studyMaterials.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    materials: ['Микрофоны. От А до Я', 'Всё о сведении музыки']
};

const studyMaterialsSlice = createSlice({
    name: 'studyMaterials',
    initialState,
    reducers: {
        addMaterial: (state, action) => {
            state.materials.push(action.payload);
        },
    },
});

export const { addMaterial } = studyMaterialsSlice.actions;

export const selectStudyMaterials = state => state.studyMaterials.materials;

export const studyMaterialsReducer = studyMaterialsSlice.reducer;
