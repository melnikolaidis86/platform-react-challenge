import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { useUserContext } from "../app/userContext";
import { fetchFavourites } from "../features/favourites";
import { CatList } from "../components/";

export function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { userId } = useUserContext()

    // We have to fetch favourites in order to check if any of images are already been in favourites
    useEffect(() => {
        if (userId) {
            dispatch(fetchFavourites(userId));
        }
    }, [userId, dispatch]);

    return (
        <main className="w-full max-w-7xl mx-auto py-6 px-3 md:px-6">
            <h1 className="text-2xl text-center sm:text-3xl md:text-4xl font-extrabold text-gray-600 leading-tight tracking-tight mb-3">Meet Our Furry Friends</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto text-left mb-4">
                Learn more about our beloved companions and friends. Just click an image to learn more..
            </p>
            <CatList />
        </main>
    );
}