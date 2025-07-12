export interface BreedImage {
    id: string;
    url: string;
}

export interface Breed {
    id: string;
    name: string;
    description: string;
    origin: string;
    country_code: string;
    temperament: string;
    wikipedia_url: string;
    life_span: string;
}

export interface BreedsState {
    breeds: Breed[];
    currentBreed: Breed | null;
    currentBreedImages: BreedImage[];
    loading: boolean;
    error: string | null;
}
