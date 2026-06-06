import { useState } from "react";
import recipes from "../data/recipes.json";
import "../components/RecipesPage.css";

export default function RecipesPage() {
  const [userIngredients, setUserIngredients] = useState(["egg", "milk"]); // Replace with state or context
  const [searchTerm, setSearchTerm] = useState("");

  const possibleRecipes = recipes.filter(recipe => {
    const matchesIngredients = recipe.ingredients.every(ing => userIngredients.includes(ing));
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesIngredients && matchesSearch;
  });

  return (
    <div className="recipes-page">
      <div className="recipes-container">
        <h2 className="recipes-title">
          Recipes You Can Make
        </h2>
        
        <div className="recipes-search-container">
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes..."
            className="recipes-search-input"
          />
        </div>

        {possibleRecipes.length > 0 ? (
          <div className="recipes-list-container">
            <h3 className="recipes-list-header">
              Available Recipes ({possibleRecipes.length})
            </h3>
            <div className="recipes-grid">
              {possibleRecipes.map((r, i) => (
                <div key={i} className="recipe-card">
                  <h4 className="recipe-card-title">
                    {r.name}
                  </h4>
                  <p className="recipe-card-ingredients">
                    <strong>Ingredients:</strong> {r.ingredients.join(", ")}
                  </p>
                  {r.video && (
                    <video 
                      src={r.video} 
                      controls 
                      className="recipe-video"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="recipes-empty-state">
            {searchTerm ? 
              `No recipes found matching "${searchTerm}". Try a different search term.` :
              "No recipes available with your current ingredients. Add more ingredients to your pantry!"
            }
          </div>
        )}
      </div>
    </div>
  );
}