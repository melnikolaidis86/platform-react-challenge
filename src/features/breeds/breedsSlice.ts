import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Breed, BreedImage, BreedsState } from "./types";

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
        const response = await fetch('/api/breeds');
        if (!response.ok) {
            throw new Error('Failed to fetch cats');
        }
        return (await response.json()) as Breed[];
    }
);

export const fetchBreedImages = createAsyncThunk(
    'breeds/fetchBreedImages',
    async (breedId: string, thunkAPI) => {
        const response = await fetch(`/api/breeds/${breedId}`);
        if (!response.ok) {
            throw new Error('Failed to breed images');
        }
        return (await response.json()) as BreedImage[];
    }
);

const catsSlice = createSlice({
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

export const { setCurrentBreed } = catsSlice.actions;
export default catsSlice.reducer;