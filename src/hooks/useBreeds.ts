import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchBreeds } from "../features/breeds";
import { resetCats } from "../features/cats";

export const useBreeds = () => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const breeds = useSelector((state: RootState) => state.breeds.breeds);
    const loading = useSelector((state: RootState) => state.breeds.loading);
    const error = useSelector((state: RootState) => state.breeds.error);

    useEffect(() => {
        dispatch(fetchBreeds());
    }, [dispatch]);

    useEffect(() => {
        // Clear cats when navigating to breeds view
        if (location.pathname.startsWith("/breeds")) {
            dispatch(resetCats());
        }
    }, [location.pathname, dispatch]);

    return {
        breeds,
        loading,
        error,
    }
}