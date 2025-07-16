import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchBreeds } from "../features/breeds";

export const useBreeds = () => {
    const dispatch = useDispatch<AppDispatch>();
    const breeds = useSelector((state: RootState) => state.breeds.breeds);
    const loading = useSelector((state: RootState) => state.breeds.loading);
    const error = useSelector((state: RootState) => state.breeds.error);

    useEffect(() => {
        dispatch(fetchBreeds());
    }, [dispatch]);

    return {
        breeds,
        loading,
        error,
    }
}