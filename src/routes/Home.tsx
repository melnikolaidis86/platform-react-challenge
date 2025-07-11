import { CatList } from "../components/";
import React from "react";

export function Home() {
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