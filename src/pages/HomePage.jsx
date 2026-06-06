import { useState } from "react";
import "../components/IngredientsPage.css";

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("");

  const addIngredient = () => {
    if (input.trim()) {
      setIngredients([...ingredients, input]);
      setInput("");
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="ingredients-page">
      <div className="ingredients-container">
        <h2 className="ingredients-title">
          Your Pantry Ingredients
        </h2>
        
        <div className="ingredients-input-group">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
            placeholder="Enter an ingredient..."
            className="ingredients-input"
          />
          <button 
            onClick={addIngredient}
            className="add-ingredient-btn"
          >
            Add Ingredient
          </button>
        </div>

        {ingredients.length > 0 ? (
          <div className="ingredients-list-container">
            <h3 className="ingredients-list-header">
              Ingredients List ({ingredients.length})
            </h3>
            <ul className="ingredients-list">
              {ingredients.map((ing, i) => (
                <li key={i} className="ingredient-item">
                  <span className="ingredient-name">{ing}</span>
                  <button
                    onClick={() => removeIngredient(i)}
                    className="remove-ingredient-btn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="empty-state">
            No ingredients added yet. Start by adding some ingredients to your pantry!
          </div>
        )}
      </div>
    </div>
  );
}