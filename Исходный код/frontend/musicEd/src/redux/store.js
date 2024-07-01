import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth';
import { studyMaterialsReducer } from './slices/studyMaterials';

const store = configureStore({
    reducer: {
        auth: authReducer,
        studyMaterials: studyMaterialsReducer,
    },
})

export default store;