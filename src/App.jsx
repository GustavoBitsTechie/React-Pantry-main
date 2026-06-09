import { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import recipes from "./data/recipes.json";
import "./components/Navigation.css";

const fallbackFeed = [
  {
    id: 1,
    name: "Spicy Garlic Noodles",
    creator: "Chef Nia",
    ingredients: ["noodles", "garlic", "chili oil", "soy sauce", "green onion"],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: 2,
    name: "Crispy Honey Chicken Bowl",
    creator: "Marco Eats",
    ingredients: ["chicken", "honey", "rice", "broccoli", "sesame seeds"],
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    id: 3,
    name: "5-Minute Avocado Toast",
    creator: "Lia Kitchen",
    ingredients: ["bread", "avocado", "lemon", "salt", "chili flakes"],
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  }
];

const defaultUserIngredients = ["egg", "milk"];

function App() {
  const feedRecipes = useMemo(() => {
    if (Array.isArray(recipes) && recipes.length > 0) {
      return recipes.map((recipe, index) => ({
        id: recipe.id ?? index + 1,
        name: recipe.name ?? "Untitled Recipe",
        creator: recipe.creator ?? recipe.author ?? "Community Cook",
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        video: recipe.video ?? ""
      }));
    }

    return fallbackFeed;
  }, []);

  const [userIngredients, setUserIngredients] = useState(() => {
    const saved = localStorage.getItem("pantryUserIngredients");

    if (!saved) {
      return defaultUserIngredients;
    }

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : defaultUserIngredients;
    } catch {
      return defaultUserIngredients;
    }
  });

  const [savedRecipeIds, setSavedRecipeIds] = useState(() => {
    const saved = localStorage.getItem("pantrySavedRecipeIds");

    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [postedRecipes, setPostedRecipes] = useState(() => {
    const saved = localStorage.getItem("pantryPostedRecipes");

    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  function handleToggleSaveRecipe(recipeId) {
    setSavedRecipeIds((prev) => {
      const next = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];

      localStorage.setItem("pantrySavedRecipeIds", JSON.stringify(next));
      return next;
    });
  }

  function handleIngredientsChange(nextIngredients) {
    setUserIngredients(nextIngredients);
    localStorage.setItem("pantryUserIngredients", JSON.stringify(nextIngredients));
  }

  function handleAddPostedRecipe(recipe) {
    setPostedRecipes((prev) => {
      const next = [{ ...recipe, id: Date.now() }, ...prev];
      localStorage.setItem("pantryPostedRecipes", JSON.stringify(next));
      return next;
    });
  }

  function handleEditPostedRecipe(recipeId, updatedRecipe) {
    setPostedRecipes((prev) => {
      const next = prev.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, ...updatedRecipe, id: recipe.id } : recipe
      );
      localStorage.setItem("pantryPostedRecipes", JSON.stringify(next));
      return next;
    });
  }

  function handleDeletePostedRecipe(recipeId) {
    setPostedRecipes((prev) => {
      const next = prev.filter((recipe) => recipe.id !== recipeId);
      localStorage.setItem("pantryPostedRecipes", JSON.stringify(next));
      return next;
    });
  }

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
        <Route
          path="/"
          element={
            <HomePage
              feedRecipes={feedRecipes}
              savedRecipeIds={savedRecipeIds}
              onToggleSaveRecipe={handleToggleSaveRecipe}
            />
          }
        />
        <Route
          path="/recipes"
          element={
            <RecipesPage
              feedRecipes={feedRecipes}
              userIngredients={userIngredients}
              onIngredientsChange={handleIngredientsChange}
              postedRecipes={postedRecipes}
              onAddPostedRecipe={handleAddPostedRecipe}
              onEditPostedRecipe={handleEditPostedRecipe}
              onDeletePostedRecipe={handleDeletePostedRecipe}
              savedRecipeIds={savedRecipeIds}
            />
          }
        />
        <Route path="/add" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;