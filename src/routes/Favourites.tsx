import React from "react";
import { FavouritesList } from "../components/";
import { maxFavourites } from "../features/favourites";

export function Favourites() {

    return (
        <main className="w-full max-w-7xl mx-auto py-6 px-3 md:px-6 min-h-[556px]">
            <h1 className="text-2xl text-center sm:text-3xl md:text-4xl font-extrabold text-gray-600 leading-tight tracking-tight mb-3">Your Favorites</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto text-left mb-4">
                {`Here is the list with your favourite kitties. Remember you can save only up to ${maxFavourites} of them. Please be picky!`}
            </p>
            <FavouritesList />
        </main>
    );
}