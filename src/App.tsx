import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./routes/Home";
import { Breeds } from "./routes/Breeds";
import { Footer, Navbar } from "./components";

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cats/:cat_id" element={<Home />} />
              <Route path="/breeds" element={<Breeds />} />
          </Routes>
          <Footer />
      </Router>
  );
}

export default App;
