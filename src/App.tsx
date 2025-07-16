import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { Breeds } from "./routes/Breeds";
import { Favourites } from "./routes/Favourites";
import { UserProvider } from "./context/userContext";
import { Footer, Navbar, PopupMessage } from "./components";
import { useFavourites } from "./hooks";

function App() {
    const { favouriteLimitError, resetFavouritesError } = useFavourites();

    return (
        <UserProvider>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cats/:cat_id" element={<Home/>}/>
                    <Route path="/breeds" element={<Breeds/>}/>
                    <Route path="/favourites" element={<Favourites/>}/>
                </Routes>
                { favouriteLimitError && <PopupMessage message={favouriteLimitError} type="error" onClose={() => resetFavouritesError()} /> }
                <Footer/>
            </Router>
        </UserProvider>
    );
}

export default App;
