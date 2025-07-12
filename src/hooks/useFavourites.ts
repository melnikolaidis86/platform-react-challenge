import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import {addFavourite, fetchFavourites, removeFavourite} from "../features/favourites";

export const useFavourites = (catId?: string) => {
    const [animate, setAnimate] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const favourites = useSelector((state: RootState) => state.favourites.favourites);
    const loading = useSelector((state: RootState) => state.favourites.loading);

    // Normalize: Keep latest favourites per image_id
    const uniqueFavourites = useMemo(() => {
        const map = new Map<string, typeof favourites[number]>();
        favourites.forEach((fav) => {
            const existing = map.get(fav.image_id);
            if (!existing || new Date(fav.created_at) > new Date(existing.created_at)) {
                map.set(fav.image_id, fav);
            }
        });
        return Array.from(map.values());
    }, [favourites]);

    const isFavourite = useMemo(() => {
        return !!uniqueFavourites.find((element) => element.image_id === catId);
    }, [favourites, catId]);

    const toggleFavourite = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            if (isFavourite) {
                const currentFavourite = uniqueFavourites.find((favourite) => favourite.image_id === catId);
                if (currentFavourite?.id) {
                    await dispatch(removeFavourite(currentFavourite.id)).unwrap();
                }
            } else {
                await dispatch(addFavourite(catId!)).unwrap();
            }
            dispatch(fetchFavourites(0));
            setAnimate(true);
            setTimeout(() => setAnimate(false), 300);
        } catch (err) {
            console.error("Failed to add favourite:", err);
        }
    };

    const handleRemove = async (favourite_id: string) => {
        await dispatch(removeFavourite(favourite_id)).unwrap();
        dispatch(fetchFavourites(0));
    };

    return {
        loading,
        animate,
        isFavourite,
        uniqueFavourites,
        handleRemove,
        toggleFavourite,
    }
}