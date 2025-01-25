import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RecipeCard from "./RecipeCard"

const GeneratedRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const recipe = location.state?.recipe;
  const theme = location.state?.theme;

  if (!recipe) return <p>No recipe to display.</p>;

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe), // Send recipe as JSON
      });

      const data = await response.json();
      if (response.ok) {
        alert('Recipe saved :D')
        navigate("/recipes");
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
      <RecipeCard recipe={recipe} />

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
