import { useState } from "react";
import "../components/AddRecipePage.css";

export default function AddRecipePage() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [video, setVideo] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !ingredients.trim()) {
      alert("Please fill in at least the recipe name and ingredients!");
      return;
    }

    const newRecipe = {
      name: name.trim(),
      ingredients: ingredients.split(",").map(i => i.trim()).filter(i => i),
      video: video.trim(),
      instructions: instructions.trim()
    };
    console.log("Recipe submitted:", newRecipe);
    // Later: send to backend or save in localStorage
    
    setIsSubmitted(true);
    setTimeout(() => {
      setName("");
      setIngredients("");
      setVideo("");
      setInstructions("");
      setIsSubmitted(false);
    }, 2000);
  };

  const handleReset = () => {
    setName("");
    setIngredients("");
    setVideo("");
    setInstructions("");
    setIsSubmitted(false);
  };

  return (
    <div className="add-recipe-page">
      <div className="add-recipe-container">
        <h2 className="add-recipe-title">
          Add a New Recipe
        </h2>
        
        {isSubmitted ? (
          <div className="recipe-success-message">
            ✅ Recipe added successfully!
          </div>
        ) : (
          <div className="add-recipe-form">
            <div className="form-group">
              <label className="form-label">
                Recipe Name *
              </label>
              <input 
                placeholder="Enter recipe name..."
                value={name}
                onChange={e => setName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Ingredients (comma separated) *
              </label>
              <input 
                placeholder="e.g., flour, eggs, milk, sugar..."
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Instructions (optional)
              </label>
              <textarea 
                placeholder="Enter cooking instructions..."
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                rows={4}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Video URL (optional)
              </label>
              <input 
                placeholder="https://example.com/recipe-video.mp4"
                value={video}
                onChange={e => setVideo(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-buttons">
              <button 
                onClick={handleSubmit}
                className="submit-recipe-btn"
              >
                Add Recipe
              </button>
              <button 
                onClick={handleReset}
                className="reset-recipe-btn"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}