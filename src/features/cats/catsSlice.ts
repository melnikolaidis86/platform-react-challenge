import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface CatImage {
    id: string;
    url: string;
}

interface CatsState {
    cats: CatImage[];
    loading: boolean;
    error: string | null;
}

const initialState: CatsState = {
    cats: [],
    loading: false,
    error: null,
};

export const fetchCats = createAsyncThunk(
    'cats/fetchCats',
    async () => {
        const response = await fetch('/api/cats');
        if (!response.ok) {
            throw new Error('Failed to fetch cats');
        }
        return (await response.json()) as CatImage[];
    }
);

const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCats.fulfilled, (state, action: PayloadAction<CatImage[]>) => {
                state.loading = false;
                state.cats = action.payload;
            })
            .addCase(fetchCats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cats';
            });
    },
});

export default catsSlice.reducer;