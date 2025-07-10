import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Breed {
    id: string;
    name: string;
}

interface BreedsState {
    breeds: Breed[];
    loading: boolean;
    error: string | null;
}

const initialState: BreedsState = {
    breeds: [],
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

const catsSlice = createSlice({
    name: 'breeds',
    initialState,
    reducers: {},
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
            });
    },
});

export default catsSlice.reducer;