import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchCats } from "../features/cats";
import { useEffect } from "react";

export const useCats = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cats = useSelector((state: RootState) => state.cats.cats);
    const page = useSelector((state: RootState) => state.cats.page);
    const initialLoading = useSelector((state: RootState) => state.cats.initialLoading);
    const loadMoreLoading = useSelector((state: RootState) => state.cats.loadMoreLoading);
    const error = useSelector((state: RootState) => state.cats.error);


    const handleLoadMore = () => {
        dispatch(fetchCats(page));
    };

    useEffect(() => {
        dispatch(fetchCats(0));
    }, [dispatch]);

    return {
        cats,
        initialLoading,
        loadMoreLoading,
        error,
        handleLoadMore,
    }
}