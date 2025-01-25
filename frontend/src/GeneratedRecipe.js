import React from "react";
import { useNavigate } from "react-router-dom";

const GeneratedRecipe = ({ recipe, theme }) => {
  const navigate = useNavigate();

  if (!recipe) return <p>No recipe to display.</p>;

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/save_recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe), // Send recipe as JSON
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Recipe saved successfully!");
      } else {
        throw new Error(data.message || "Failed to save recipe");
      }
    } catch (error) {
      alert(`Error saving recipe: ${error.message}`);
    }
  };

  const handleGenerateAnother = () => {
    // Navigate back to the main page and pass the theme to start again
    navigate("/", { state: { theme } });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1 style={{ color: "#333" }}>{recipe.name}</h1>

      <h3>Ingredients</h3>
      <ul style={{ padding: "0", listStyleType: "none" }}>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.amount} {ingredient.unit}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* Save Recipe Button */}
      <button
        style={{ padding: "10px 15px", margin: "10px", cursor: "pointer" }}
        onClick={handleSave}
      >
        Save Recipe
      </button>

      {/* Generate Another Recipe Button */}
      <button
        style={{ padding: "10px 15px", margin: "10px", cursor: "pointer" }}
        onClick={handleGenerateAnother}
      >
        Generate Another Recipe
      </button>
    </div>
  );
};

export default GeneratedRecipe;
