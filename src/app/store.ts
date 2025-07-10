import { configureStore } from '@reduxjs/toolkit';

import catsReducer from '../features/cats/catsSlice';
import breedsReducer from '../features/breeds/breedsSlice';

export const store = configureStore({
    reducer: {
        cats: catsReducer,
        breeds: breedsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;