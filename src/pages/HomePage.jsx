import { useMemo, useState } from "react";
import recipes from "../data/recipes.json";
import "../components/HomePage.css";

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

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

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