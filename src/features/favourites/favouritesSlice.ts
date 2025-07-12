import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Favourite, FavouritesState } from "./types";
import axios from 'axios';

const initialState: FavouritesState = {
    favourites: [],
    loading: false,
    error: null,
}

export const fetchFavourites = createAsyncThunk(
    'favourites/fetchFavourites',
    async (page: number, thunkAPI) => {
        const response = await axios.get(`/api/favourites?page=${page}`);
        if (!response?.data) {
            throw new Error('Failed to fetch cats');
        }
        return (await response.data) as Favourite[];
    }
)

export const addFavourite = createAsyncThunk(
    'favourites/addFavourite',
    async (image_id: string, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/favourites", { image_id });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const removeFavourite = createAsyncThunk(
    'favourites/removeFavourite',
    async (favourite_id: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/favourites/${favourite_id}`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavourites.fulfilled, (state, action: PayloadAction<Favourite[]>) => {
                state.loading = false;
                state.favourites = action.payload;
            })
            .addCase(fetchFavourites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addFavourite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFavourite.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addFavourite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default favouritesSlice.reducer;