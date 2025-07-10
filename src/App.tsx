import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./routes/Home";
import { Breeds } from "./routes/Breeds";

function App() {
  return (
      <Router>
          <nav className="p-4 bg-gray-200">
              <Link to="/" className="mr-4">Home</Link>
          </nav>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/breeds" element={<Breeds />} />
          </Routes>
      </Router>
  );
}

export default App;
