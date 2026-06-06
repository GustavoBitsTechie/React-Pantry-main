import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import "./components/Navigation.css";

function App() {
  return (
    <Router>
      <nav className="navigation">
        <div className="nav-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/recipes" className="nav-link">Recipes</NavLink>
          <NavLink to="/add" className="nav-link">Profile</NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/add" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;