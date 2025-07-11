import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface CatImage {
    id: string;
    url: string;
}

interface CatsState {
    cats: CatImage[];
    page: number;
    initialLoading: boolean;
    loadMoreLoading: boolean;
    error: string | null;
}

const initialState: CatsState = {
    cats: [],
    page: 0,
    initialLoading: false,
    loadMoreLoading: false,
    error: null,
};

export const fetchCats = createAsyncThunk(
    'cats/fetchCats',
    async (page: number, thunkAPI) => {
        const response = await fetch(`/api/cats?page=${page}`);
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
                const isInitialLoading = state.page === 0;
                state.initialLoading = isInitialLoading;
                state.loadMoreLoading = !isInitialLoading;
            })
            .addCase(fetchCats.fulfilled, (state, action: PayloadAction<CatImage[]>) => {
                state.initialLoading = false;
                state.loadMoreLoading = false;
                state.page += 1;
                state.cats = [...state.cats, ...action.payload];
            })
            .addCase(fetchCats.rejected, (state, action) => {
                state.initialLoading = false;
                state.loadMoreLoading = false;
                state.error = action.error.message || 'Failed to fetch cats';
            });
    },
});

export default catsSlice.reducer;