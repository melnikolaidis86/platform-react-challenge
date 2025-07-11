import React from "react";
import { SpinnerLoader, CatCard, CatDetailsModal } from "../components";
import { useCats } from "../hooks";

export function CatList() {
    const { initialLoading, loadMoreLoading, handleLoadMore, cats, error} = useCats();

    if (initialLoading) {
        return <SpinnerLoader />
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-full max-w-[1344px] mx-auto">
            <h1>Cats Gallery</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {cats.map(cat => <CatCard key={cat.id} cat={cat}/>)}
            </div>
            <button
                onClick={handleLoadMore}
                disabled={loadMoreLoading}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {loadMoreLoading ? 'Loading...' : 'Load More Cats'}
            </button>

            <CatDetailsModal />
        </div>
    );
}