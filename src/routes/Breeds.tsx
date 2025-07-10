import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import type { AppDispatch, RootState } from "../app/store";
import { fetchBreeds } from "../features/breeds/breedsSlice";

export function Breeds() {
    const dispatch = useDispatch<AppDispatch>();
    const breeds = useSelector((state: RootState) => state.breeds.breeds);
    const loading = useSelector((state: RootState) => state.breeds.loading);
    const error = useSelector((state: RootState) => state.breeds.error);

    useEffect(() => {
        dispatch(fetchBreeds());
    }, [dispatch]);

    if (loading) return <p>Loading cats...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-full max-w-[1344px] mx-auto">
            <h1>Breeds List</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {breeds.map(breed => <div key={breed.id}>{breed.name}</div>)}
            </div>
        </div>
    );
}