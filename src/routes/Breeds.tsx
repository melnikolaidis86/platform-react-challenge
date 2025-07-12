import React from "react";
import { BreedsTable, SpinnerLoader } from "../components";
import { useBreeds } from "../hooks";

export function Breeds() {
    const { breeds, loading, error } = useBreeds();

    if (loading) {
        return <SpinnerLoader />
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <main className="w-full max-w-7xl mx-auto py-6 px-3 md:px-6">
            <h1 className="text-2xl text-center sm:text-3xl md:text-4xl font-extrabold text-gray-600 leading-tight tracking-tight mt-3 mb-3">Breeds List</h1>
            <div>
                <BreedsTable breeds={breeds} />
            </div>
        </main>
    );
}