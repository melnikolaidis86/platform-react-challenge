import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchCatById, resetCurrentCat } from "../features/cats";
import { useEffect } from "react";

export const useCatDetails = () => {
    const navigate = useNavigate();
    const { cat_id } = useParams();
    const currentCat = useSelector((state: RootState) => state.cats.currentCat);
    const dispatch = useDispatch<AppDispatch>();

    const isModalOpen = Boolean(currentCat);

    const handleClose = () => {
        // Close Modal actions - set currentCat back to null
        navigate("/", { replace: true });
        dispatch(resetCurrentCat());
    };

    useEffect(() => {
        if (!!cat_id) {
            dispatch(fetchCatById(cat_id))
        }
    }, [cat_id]);

    return {
        currentCat,
        isModalOpen,
        handleClose,
    }
}