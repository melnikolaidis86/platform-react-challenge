import React from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { Modal } from "./Modal";
import { useCatDetails } from "../hooks";

export function CatDetailsModal() {
    const { isModalOpen, currentCat, handleClose } = useCatDetails();

    return (
        <Modal isOpen={isModalOpen} onClose={handleClose}>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 w-full">
                    <img
                        src={currentCat?.url}
                        alt={currentCat?.breeds?.[0]?.name || "Cat image"}
                        className="rounded-lg object-cover w-full h-auto max-h-96"
                    />
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
                    </ul>
                </div>
            </div>
        </Modal>
    )
}