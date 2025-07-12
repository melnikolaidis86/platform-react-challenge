import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, fetchFavourites, removeFavourite } from "../features/favourites";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type { AppDispatch, RootState } from "../app/store";

export function FavouriteButton({ catId }: { catId: string }) {
    const [animate, setAnimate] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const favourites = useSelector((state: RootState) => state.favourites.favourites);
    const AiFillHeartIcon = AiFillHeart as React.FC<React.SVGProps<SVGSVGElement>>;
    const AiOutlineHeartIcon = AiOutlineHeart as React.FC<React.SVGProps<SVGSVGElement>>;

    const toggleFavourite = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            if (isFavourite) {
                const currentFavourite = favourites.find((favourite) => favourite.image_id === catId);
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

    const isFavourite = useMemo(() => {
        return !!favourites.find((element) => element.image_id === catId);
    }, [favourites, catId]);

    return (
        <button
            onClick={toggleFavourite}
            className="absolute top-3 right-3 bg-white/70 hover:bg-white p-1 rounded-full z-10"
        >
            <div
                className={`transition-transform duration-300 ${
                    animate ? "scale-125" : "scale-100"
                }`}
            >
                {isFavourite ? (
                    <AiFillHeartIcon className="text-red-500 w-7 h-7" />
                ) : (
                    <AiOutlineHeartIcon className="text-gray-700 w-7 h-7" />
                )}
            </div>
        </button>
    )
}