import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Breed, BreedImage, BreedsState } from "./types";
import axios from "axios";

const initialState: BreedsState = {
    breeds: [],
    currentBreed: null,
    currentBreedImages: [],
    loading: false,
    error: null,
};

export const fetchBreeds = createAsyncThunk(
    'breeds/fetchBreeds',
    async () => {
        const response = await axios.get('/api/breeds');
        if (!response?.data) {
            throw new Error('Failed to fetch breeds');
        }
        return (await response.data) as Breed[];
    }
);

export const fetchBreedImages = createAsyncThunk(
    'breeds/fetchBreedImages',
    async (breedId: string, thunkAPI) => {
        const response = await axios.get(`/api/breeds/${breedId}`);
        if (!response?.data) {
            throw new Error('Failed to breed images');
        }
        return (await response.data) as BreedImage[];
    }
);

const breedsSlice = createSlice({
    name: 'breeds',
    initialState,
    reducers: {
        setCurrentBreed: (state, action: PayloadAction<Breed | null>) => {
            state.currentBreed = action.payload;
            state.currentBreedImages = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBreeds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBreeds.fulfilled, (state, action: PayloadAction<Breed[]>) => {
                state.loading = false;
                state.breeds = action.payload;
            })
            .addCase(fetchBreeds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch breeds';
            })
            .addCase(fetchBreedImages.fulfilled, (state, action: PayloadAction<BreedImage[]>) => {
                state.currentBreedImages = action.payload;
            })
            .addCase(fetchBreedImages.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch breed images';
            });
    },
});

export const { setCurrentBreed } = breedsSlice.actions;
export default breedsSlice.reducer;