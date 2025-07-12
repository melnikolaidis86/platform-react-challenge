import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Home } from "./routes/Home";
import { Breeds } from "./routes/Breeds";
import { Favourites } from "./routes/Favourites";
import { fetchFavourites } from "./features/favourites";
import type { AppDispatch } from "./app/store";
import { Footer, Navbar } from "./components";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchFavourites(0));
    }, [dispatch]);

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cats/:cat_id" element={<Home/>}/>
                <Route path="/breeds" element={<Breeds/>}/>
                <Route path="/favourites" element={<Favourites/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
