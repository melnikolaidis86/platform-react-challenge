import { CatImage } from "../cats";

export interface Favourite {
    id: string;
    image_id: string;
    created_at: string;
    sub_id: string;
    image: CatImage;
}

export interface FavouritesState {
    favourites: Favourite[];
    loading: boolean;
    error: string | null;
    favouriteLimitError: string | null;
}