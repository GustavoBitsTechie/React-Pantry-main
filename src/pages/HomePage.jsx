import { useState } from "react";
import "../components/HomePage.css";

export default function HomePage({ feedRecipes, savedRecipeIds, onToggleSaveRecipe }) {
  const [searchTerm, setSearchTerm] = useState("");

  const visibleRecipes = feedRecipes.filter((recipe) => {
    const normalizedSearch = searchTerm.toLowerCase();
    return (
      recipe.name.toLowerCase().includes(normalizedSearch) ||
      recipe.creator.toLowerCase().includes(normalizedSearch) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(normalizedSearch)
      )
    );
  });

  return (
    <main className="food-feed-page">
      <header className="food-feed-header">
        <p className="feed-eyebrow">For You</p>
        <h1>Recipe Reels</h1>
        <p className="feed-subtitle">
          Discover fast food videos with the recipe name, ingredients, and creator.
        </p>
        <input
          className="feed-search"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search recipe, ingredient, or creator"
          aria-label="Search recipe feed"
        />
      </header>

      {visibleRecipes.length === 0 ? (
        <section className="feed-empty-state">
          No recipe videos match your search yet.
        </section>
      ) : (
        <section className="food-feed-list" aria-label="Recipe video feed">
          {visibleRecipes.map((recipe) => (
            <article key={recipe.id} className="recipe-feed-card">
              <div className="recipe-video-frame">
                {recipe.video ? (
                  <video controls preload="metadata" className="recipe-video-player">
                    <source src={recipe.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="recipe-video-missing">Video coming soon</div>
                )}
              </div>

              <div className="recipe-feed-content">
                <p className="recipe-creator">By {recipe.creator}</p>
                <h2 className="recipe-title">{recipe.name}</h2>
                <button
                  type="button"
                  className="recipe-save-btn"
                  onClick={() => onToggleSaveRecipe(recipe.id)}
                >
                  {savedRecipeIds.includes(recipe.id) ? "Saved" : "Save Recipe"}
                </button>
                <p className="recipe-ingredients-label">Ingredients needed:</p>
                <ul className="recipe-ingredients-list">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={`${recipe.id}-${idx}`}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}