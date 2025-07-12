import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FavouritesList } from "../components/";
import {resetCats} from "../features/cats";
import type { AppDispatch } from "../app/store";

export function Favourites() {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    useEffect(() => {
        // Clear cats when navigating to favourites view
        if (location.pathname.startsWith("/favourites")) {
            dispatch(resetCats());
        }
    }, [location.pathname, dispatch]);

    return (
        <main className="w-full max-w-7xl mx-auto py-6 px-3 md:px-6 min-h-[556px]">
            <h1 className="text-2xl text-center sm:text-3xl md:text-4xl font-extrabold text-gray-600 leading-tight tracking-tight mb-3">Your Favorites</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto text-left mb-4">
                Here is the list with your favourite kitties. Remember you can save only up to 10 of them. Please be picky!
            </p>
            <FavouritesList />
        </main>
    );
}