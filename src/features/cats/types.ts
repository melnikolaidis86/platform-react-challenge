import { Breed } from "../breeds";

export interface CatImage {
    id: string;
    url: string;
}

export interface CatImageWithDetails extends CatImage {
    breeds: Breed[];
}

export interface CatsState {
    cats: CatImage[];
    currentCat: CatImageWithDetails | null;
    page: number;
    initialLoading: boolean;
    loadMoreLoading: boolean;
    error: string | null;
}