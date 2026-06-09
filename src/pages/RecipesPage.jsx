import { useMemo, useState } from "react";
import "../components/RecipesPage.css";

export default function RecipesPage({
  feedRecipes,
  userIngredients,
  onIngredientsChange,
  postedRecipes,
  onAddPostedRecipe,
  onEditPostedRecipe,
  onDeletePostedRecipe,
  savedRecipeIds
}) {
  const [ingredientInput, setIngredientInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newRecipeName, setNewRecipeName] = useState("");
  const [newRecipeIngredients, setNewRecipeIngredients] = useState("");
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [editingRecipeName, setEditingRecipeName] = useState("");
  const [editingRecipeIngredients, setEditingRecipeIngredients] = useState("");

  const allRecipes = useMemo(() => [...postedRecipes, ...feedRecipes], [postedRecipes, feedRecipes]);

  const savedRecipes = useMemo(
    () => feedRecipes.filter((recipe) => savedRecipeIds.includes(recipe.id)),
    [feedRecipes, savedRecipeIds]
  );

  const normalizedIngredients = userIngredients.map((ingredient) => ingredient.toLowerCase());

  const possibleRecipes = allRecipes.filter((recipe) => {
    const matchesIngredients = recipe.ingredients.every((ing) =>
      normalizedIngredients.includes(ing.toLowerCase())
    );
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesIngredients && matchesSearch;
  });

  function handleAddIngredient(event) {
    event.preventDefault();

    const normalized = ingredientInput.trim().toLowerCase();
    if (!normalized || normalizedIngredients.includes(normalized)) {
      return;
    }

    onIngredientsChange([...userIngredients, normalized]);
    setIngredientInput("");
  }

  function handleRemoveIngredient(ingredientToDelete) {
    onIngredientsChange(userIngredients.filter((ingredient) => ingredient !== ingredientToDelete));
  }

  function handlePostRecipe(event) {
    event.preventDefault();

    const recipeName = newRecipeName.trim();
    const parsedIngredients = newRecipeIngredients
      .split(",")
      .map((part) => part.trim().toLowerCase())
      .filter(Boolean);

    if (!recipeName || parsedIngredients.length === 0) {
      return;
    }

    onAddPostedRecipe({
      name: recipeName,
      creator: "You",
      ingredients: parsedIngredients,
      video: ""
    });

    setNewRecipeName("");
    setNewRecipeIngredients("");
  }

  function handleStartEdit(recipe) {
    setEditingRecipeId(recipe.id);
    setEditingRecipeName(recipe.name);
    setEditingRecipeIngredients(recipe.ingredients.join(", "));
  }

  function handleCancelEdit() {
    setEditingRecipeId(null);
    setEditingRecipeName("");
    setEditingRecipeIngredients("");
  }

  function handleSaveEdit(event) {
    event.preventDefault();

    if (editingRecipeId === null) {
      return;
    }

    const updatedName = editingRecipeName.trim();
    const updatedIngredients = editingRecipeIngredients
      .split(",")
      .map((part) => part.trim().toLowerCase())
      .filter(Boolean);

    if (!updatedName || updatedIngredients.length === 0) {
      return;
    }

    onEditPostedRecipe(editingRecipeId, {
      name: updatedName,
      ingredients: updatedIngredients,
      creator: "You"
    });

    handleCancelEdit();
  }

  return (
    <div className="recipes-page">
      <div className="recipes-container">
        <h2 className="recipes-title">My Recipes Hub</h2>

        <section className="recipes-section">
          <h3 className="recipes-list-header">Current Ingredients</h3>
          <form className="ingredient-form" onSubmit={handleAddIngredient}>
            <input
              value={ingredientInput}
              onChange={(event) => setIngredientInput(event.target.value)}
              placeholder="Add ingredient"
              className="recipes-search-input"
            />
            <button type="submit" className="recipes-action-btn">Add</button>
          </form>

          <div className="ingredient-chip-list">
            {userIngredients.map((ingredient) => (
              <div key={ingredient} className="ingredient-chip">
                <span className="ingredient-chip-label">{ingredient}</span>
                <button
                  type="button"
                  className="ingredient-chip-delete"
                  onClick={() => handleRemoveIngredient(ingredient)}
                  aria-label={`Remove ${ingredient}`}
                  title="Remove ingredient"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="recipes-section">
          <h3 className="recipes-list-header">Recipes You Can Make</h3>
          <div className="recipes-search-container">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search recipes..."
              className="recipes-search-input"
            />
          </div>

          {possibleRecipes.length > 0 ? (
            <div className="recipes-grid">
              {possibleRecipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                  <h4 className="recipe-card-title">{recipe.name}</h4>
                  <p className="recipe-card-ingredients">
                    <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                  </p>
                  <p className="recipe-card-creator">By {recipe.creator}</p>
                  {recipe.video && (
                    <video src={recipe.video} controls className="recipe-video" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="recipes-empty-state">
              {searchTerm
                ? `No recipes found matching "${searchTerm}".`
                : "No recipes available with your current ingredients. Add more ingredients to your pantry!"}
            </div>
          )}
        </section>

        <section className="recipes-section">
          <h3 className="recipes-list-header">Recipes I Posted</h3>
          <form className="post-recipe-form" onSubmit={handlePostRecipe}>
            <input
              value={newRecipeName}
              onChange={(event) => setNewRecipeName(event.target.value)}
              placeholder="Recipe name"
              className="recipes-search-input"
            />
            <input
              value={newRecipeIngredients}
              onChange={(event) => setNewRecipeIngredients(event.target.value)}
              placeholder="Ingredients (comma separated)"
              className="recipes-search-input"
            />
            <button type="submit" className="recipes-action-btn">Post Recipe</button>
          </form>

          {postedRecipes.length > 0 ? (
            <div className="recipes-grid">
              {postedRecipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                  {editingRecipeId === recipe.id ? (
                    <form className="inline-edit-form" onSubmit={handleSaveEdit}>
                      <input
                        value={editingRecipeName}
                        onChange={(event) => setEditingRecipeName(event.target.value)}
                        placeholder="Recipe name"
                        className="recipes-search-input"
                      />
                      <input
                        value={editingRecipeIngredients}
                        onChange={(event) => setEditingRecipeIngredients(event.target.value)}
                        placeholder="Ingredients (comma separated)"
                        className="recipes-search-input"
                      />
                      <div className="recipe-card-actions">
                        <button type="submit" className="recipes-action-btn">Save</button>
                        <button
                          type="button"
                          className="recipes-action-btn recipes-action-btn-secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h4 className="recipe-card-title">{recipe.name}</h4>
                      <p className="recipe-card-ingredients">
                        <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                      </p>
                      <p className="recipe-card-creator">By {recipe.creator}</p>
                      <div className="recipe-card-actions">
                        <button
                          type="button"
                          className="recipes-action-btn recipes-action-btn-secondary"
                          onClick={() => handleStartEdit(recipe)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="recipes-action-btn recipes-action-btn-danger"
                          onClick={() => onDeletePostedRecipe(recipe.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="recipes-empty-state">You have not posted any recipes yet.</div>
          )}
        </section>

        <section className="recipes-section">
          <h3 className="recipes-list-header">Saved From Home Page</h3>
          {savedRecipes.length > 0 ? (
            <div className="recipes-grid">
              {savedRecipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                  <h4 className="recipe-card-title">{recipe.name}</h4>
                  <p className="recipe-card-ingredients">
                    <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                  </p>
                  <p className="recipe-card-creator">By {recipe.creator}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="recipes-empty-state">No saved recipes yet. Save some from Home.</div>
          )}
        </section>
      </div>
    </div>
  );
}