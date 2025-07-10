import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import type { AppDispatch, RootState } from "../app/store";
import { fetchCats } from "../features/cats/catsSlice";
import { CatCard } from "../components/CatCard";

export function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const cats = useSelector((state: RootState) => state.cats.cats);
    const loading = useSelector((state: RootState) => state.cats.loading);
    const error = useSelector((state: RootState) => state.cats.error);

    useEffect(() => {
        dispatch(fetchCats());
    }, [dispatch]);

    if (loading) return <p>Loading cats...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-full max-w-[1344px] mx-auto">
            <h1>Cats Gallery</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {cats.map(cat => <CatCard key={cat.id} cat={cat}/>)}
            </div>
        </div>
    );
}