import { Link } from "react-router-dom";
import { useBreedDetails } from "../hooks";
import { Modal } from "./Modal";
import * as Flags from "country-flag-icons/react/3x2";
import React from "react";

export function BreedDetailsModal() {
    const { isModalOpen, currentBreed, currentBreedImages, handleClose } = useBreedDetails();
    const Code = currentBreed && currentBreed.country_code.toUpperCase();
    const Flag = Code && (Flags as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[Code];

    return (
        <Modal isOpen={isModalOpen} onClose={handleClose}>
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">{currentBreed?.name}</h2>
                    <p className="text-gray-700 mb-4">{currentBreed?.description || "No description available."}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center space-x-1 h-4">
                            <strong>Origin:</strong>
                            <span>{currentBreed?.origin || "Unknown"}</span>
                            {Flag && <Flag className="w-6 h-4 inline-block ml-2" />}
                        </li>
                        <li>
                            <strong className="mr-1">Temperament:</strong>
                            {currentBreed?.temperament || "Not specified"}
                        </li>
                        <li>
                            <strong className="mr-1">Life Span:</strong>
                            {currentBreed?.life_span || "Not specified"}
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-2">Breed Images</h3>
                    {currentBreedImages.length ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {currentBreedImages.map(({ url, id }) => (
                                <Link to={`/cats/${id}`}>
                                    <img
                                        key={id}
                                        src={url}
                                        alt={`${currentBreed?.name} image ${id}`}
                                        className="rounded-lg object-cover w-full h-40"
                                    />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No images available.</p>
                    )}
                </div>
            </div>
        </Modal>
    );
}