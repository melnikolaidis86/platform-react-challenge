import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { fetchBreedImages, setCurrentBreed, Breed } from "../features/breeds";

export const useBreedDetails = () => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const currentBreed = useSelector((state: RootState) => state.breeds.currentBreed);
    const currentBreedImages = useSelector((state: RootState) => state.breeds.currentBreedImages);
    const isModalOpen = Boolean(currentBreed);

    const handleSelectBreed = (breed: Breed) => {
        dispatch(setCurrentBreed(breed));
        dispatch(fetchBreedImages(breed.id));
    }

    const handleClose = () => {
        dispatch(setCurrentBreed(null));
    }

    useEffect(() => {
        return () => {
            // Clear current Breed when navigation changes
            dispatch(setCurrentBreed(null));
        }
    }, [location.pathname, dispatch]);

    return {
        isModalOpen,
        currentBreed,
        currentBreedImages,
        handleSelectBreed,
        handleClose,
    }
}