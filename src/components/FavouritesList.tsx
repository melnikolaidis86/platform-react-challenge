import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useFavourites } from "../hooks";
import { SpinnerLoader } from "./SpinnerLoader";
import React from "react";

dayjs.extend(relativeTime);

export function FavouritesList() {
    const { loading, uniqueFavourites, handleRemove } = useFavourites();

    if (loading) {
        return <SpinnerLoader />;
    }

    if (uniqueFavourites.length === 0) {
        return <p className="text-gray-500 mt-12 text-center">No favourites yet.</p>;
    }

    return (
        <div className="space-y-4 mt-6">
            <div className="text-left text-sm sm:text-base font-medium text-gray-600 mb-2">
                {`You currently have ${uniqueFavourites.length} favourite${uniqueFavourites.length !== 1 ? 's' : ''}`}
            </div>
            {uniqueFavourites.map((fav) => (
                <Link
                    key={fav.id}
                    to={`/cats/${fav.image_id}`}
                    className="block"
                >
                    <div
                        className="flex flex-col sm:flex-row items-center bg-white shadow rounded-xl p-4 gap-4 hover:shadow-md transition relative"
                    >
                        <img
                            src={fav.image?.url}
                            alt="Cat"
                            className="w-80 h-80 sm:w-32 sm:h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1 w-80 mx-auto sm:w-full">
                            <p className="text-gray-800 font-semibold">You have been adoring ♡ this kitty since</p>
                            <p className="text-sm text-gray-500">
                                {dayjs(fav.created_at).fromNow()}
                            </p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemove(fav.id);
                            }}
                            className="text-red-500 hover:text-red-700 p-3 font-medium z-10"
                        >
                            Remove
                        </button>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default FavouritesList;
