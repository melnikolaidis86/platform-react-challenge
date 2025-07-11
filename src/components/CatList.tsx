import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { fetchCats } from "../features/cats/catsSlice";
import { SpinnerLoader, CatCard, Modal } from "../components";

export function CatList() {
    const dispatch = useDispatch<AppDispatch>();
    const cats = useSelector((state: RootState) => state.cats.cats);
    const page = useSelector((state: RootState) => state.cats.page);
    const initialLoading = useSelector((state: RootState) => state.cats.initialLoading);
    const loadMoreLoading = useSelector((state: RootState) => state.cats.loadMoreLoading);
    const error = useSelector((state: RootState) => state.cats.error);

    const { cat_id } = useParams();
    const navigate = useNavigate();
    const isModalOpen = Boolean(cat_id);

    const handleLoadMore = () => {
        dispatch(fetchCats(page + 1));
    };

    const handleClose = () => {
        navigate("/", { replace: true }); // close modal
    };

    useEffect(() => {
        dispatch(fetchCats(0));
    }, [dispatch]);

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

            <Modal isOpen={isModalOpen} onClose={handleClose}>
                <h2 className="text-xl font-semibold mb-2">Cat Details</h2>
                <p>You're viewing details for cat ID: {cat_id}</p>
            </Modal>
        </div>
    );
}