import React from "react";
import { useFavourites } from "../hooks";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export function FavouriteButton({ catId }: { catId: string }) {
    const { toggleFavourite, animate, isFavourite } = useFavourites(catId);
    const AiFillHeartIcon = AiFillHeart as React.FC<React.SVGProps<SVGSVGElement>>;
    const AiOutlineHeartIcon = AiOutlineHeart as React.FC<React.SVGProps<SVGSVGElement>>;

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