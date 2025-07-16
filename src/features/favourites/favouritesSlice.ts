import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from "../../app/store";
import type { Favourite, FavouritesState } from "./types";
import axios from 'axios';

// This variable MUST be equal or lesser than MAX_FAVOURITES in api
export const maxFavourites = Number.parseInt(process.env.REACT_APP_MAX_FAVOURITES ?? "10");

const initialState: FavouritesState = {
    favourites: [],
    loading: false,
    error: null,
    favouriteLimitError: null,
}

export const fetchFavourites = createAsyncThunk(
    'favourites/fetchFavourites',
    async (sub_id: string, thunkAPI) => {
        const response = await axios.get(`/api/favourites?sub_id=${sub_id}`);
        if (!response?.data) {
            throw new Error('Failed to fetch cats');
        }
        return (await response.data) as Favourite[];
    }
)

export const addFavourite = createAsyncThunk(
    'favourites/addFavourite',
    async ({ image_id, sub_id }: { image_id: string; sub_id: string | null }, { rejectWithValue, getState, dispatch }) => {
        const state = getState() as RootState;
        // Set a limit for favourites
        const { favourites } = state.favourites;
        if (favourites.length > (maxFavourites - 1)) {
            dispatch(setFavouritesLimitReached(`I am sorry you have reached the maximum number of favourites you can save (${maxFavourites}). I am afraid you have to delete another kitty first.`));
            return rejectWithValue('maximum number of favourites reached');
        }

        try {
            const response = await axios.post("/api/favourites", { image_id, sub_id });
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
    reducers: {
        setFavouritesLimitReached(state, action: PayloadAction<string>) {
            state.favouriteLimitError = action.payload;
        },
        resetFavouritesLimitReached(state) {
            state.favouriteLimitError = null;
        }
    },
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

export const { setFavouritesLimitReached, resetFavouritesLimitReached } = favouritesSlice.actions;
export default favouritesSlice.reducer;