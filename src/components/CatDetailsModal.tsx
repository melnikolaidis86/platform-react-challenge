import React from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { Modal, FavouriteButton, BarRating } from "../components";
import { useCatDetails, useFavourites } from "../hooks";
import { FiHeart as HeartOutline } from "react-icons/fi";
import { FaHeart as HeartFilled } from "react-icons/fa";

export function CatDetailsModal() {
    const { isModalOpen, currentCat, handleClose } = useCatDetails();
    const { toggleFavourite, isFavourite } = useFavourites(currentCat?.id);
    const HeartFilledIcon = HeartFilled as React.FC<React.SVGProps<SVGSVGElement>>;
    const HeartOutlineIcon = HeartOutline as React.FC<React.SVGProps<SVGSVGElement>>;

    return (
        <Modal isOpen={isModalOpen} onClose={handleClose}>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 w-full relative">
                    <img
                        src={currentCat?.url}
                        alt={currentCat?.breeds?.[0]?.name || "Cat image"}
                        className="rounded-lg object-cover w-full h-auto max-h-96"
                    />

                    {currentCat?.id && <FavouriteButton catId={currentCat.id} />}
                </div>
                <div className="md:w-1/2 w-full">
                    <h2 className="text-2xl font-semibold mb-2">
                        {currentCat?.breeds?.[0]?.name || "Cat Details"}
                    </h2>
                    <p className="text-gray-700 mb-4">
                        {currentCat?.breeds?.[0]?.description || "No description available."}
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center space-x-1 h-4">
                            <strong>Origin:</strong>
                            <span>{currentCat?.breeds?.[0]?.origin || "Unknown"}</span>
                            {currentCat?.breeds?.[0]?.country_code && (() => {
                                const Code = currentCat.breeds[0].country_code.toUpperCase();
                                const Flag = (Flags as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[Code];
                                return Flag ? (
                                    <Flag className="w-6 h-4 inline-block" />
                                ) : null;
                            })()}
                        </li>
                        <li>
                            <strong className="mr-1">Temperament:</strong>
                            {currentCat?.breeds?.[0]?.temperament || "Not specified"}
                        </li>
                        <li>
                            <strong className="mr-1">Life Span:</strong>
                            {currentCat?.breeds?.[0]?.life_span || "Not specified"}
                        </li>
                        <li className="flex items-center">
                            <strong className="mr-1">Affection:</strong>
                            <BarRating score={currentCat?.breeds?.[0]?.affection_level || 0} />
                        </li>
                        <li className="flex items-center">
                            <strong className="mr-1">Intelligence:</strong>
                            <BarRating score={currentCat?.breeds?.[0]?.intelligence || 0} />
                        </li>
                        <li className="flex items-center">
                            <strong className="mr-1">Adaptability:</strong>
                            <BarRating score={currentCat?.breeds?.[0]?.adaptability || 0} />
                        </li>
                        <li className="flex items-center">
                            <strong className="mr-1">Stranger Friendly:</strong>
                            <BarRating score={currentCat?.breeds?.[0]?.stranger_friendly || 0} />
                        </li>
                    </ul>
                    <div className="mt-6">
                        <button
                            onClick={toggleFavourite}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-100 border border-gray-300 rounded-md transition"
                        >
                            {isFavourite ? (
                                <>
                                    <HeartFilledIcon className="text-red-500" />
                                    Remove from Favourites
                                </>
                            ) : (
                                <>
                                    <HeartOutlineIcon />
                                    Add to Favourites
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}