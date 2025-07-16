import React from "react";
import { SpinnerLoader, CatCard, CatDetailsModal, ErrorMessage } from "../components";
import { useCats } from "../hooks";

export function CatList() {
    const {initialLoading, loadMoreLoading, handleLoadMore, cats, error} = useCats();

    if (initialLoading) {
        return <SpinnerLoader/>
    }

    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {cats.map(cat => <CatCard key={cat.id} cat={cat}/>)}
            </div>
            <div className="flex justify-center items-center">
                <button
                    onClick={() => handleLoadMore()}
                    disabled={loadMoreLoading}
                    data-test-id="load-more-button"
                    className={`mt-6 px-16 py-3 text-sm font-medium rounded border transition-colors 
                    ${ loadMoreLoading  ? "bg-gray-300 text-gray-600 border-gray-400 cursor-not-allowed" : "bg-gray-800 text-white border-gray-700 hover:bg-gray-900"} 
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1`}
                >
                    {loadMoreLoading ? "Loading..." : "Load More"}
                </button>
            </div>

            <CatDetailsModal/>
        </>
    );
}