import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { CatsState, CatImage, CatImageWithDetails } from "./types";

const initialState: CatsState = {
    cats: [],
    currentCat: null,
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

export const fetchCatById = createAsyncThunk(
    'cats/fetchCatById',
    async (catId: string, thunkAPI) => {
        const response = await fetch(`/api/cats/${catId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch cat with id ' + catId);
        }
        return (await response.json()) as CatImageWithDetails;
    }
)

const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        resetCurrentCat(state) {
            state.currentCat = null
        },
        resetCats(state) {
            state.cats = [];
            state.page = 0;
        },
    },
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
            })
            .addCase(fetchCatById.fulfilled, (state, action: PayloadAction<CatImageWithDetails>) => {
                state.currentCat = action.payload
            })
            .addCase(fetchCatById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch cat by current ID';
            })
    },
});

export const { resetCurrentCat, resetCats } = catsSlice.actions;
export default catsSlice.reducer;