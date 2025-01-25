import React, { useState } from "react";
import RecipeList from "./RecipeList";
import GeneratedRecipe from "./components/GeneratedRecipe";

function App() {
  const [recipe, setRecipe] = useState(null); // Holds the generated recipe
  const [theme, setTheme] = useState(""); // Holds the theme entered by the user

  const generateRecipe = async (theme) => {
    try {
      // API call to the backend to generate a recipe
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme }), // Send theme as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await response.json(); // Parse the response JSON
      setRecipe(data); // Set the generated recipe
      setTheme(theme); // Save the theme
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };

  const generateAnotherRecipe = async (theme) => {
    setRecipe(null); // Clear the current recipe
    generateRecipe(theme); // Generate a new recipe
  };

  return (
    <div className="App">
      {/* If no recipe is generated, show the RecipeList or form */}
      {!recipe ? (
        <div>
          <h1>Coca-Cola Drink Mix Generator</h1>
          <p>Enter your party theme below to get a custom drink suggestion!</p>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Enter your party theme"
          />
          <button onClick={() => generateRecipe(theme)}>Generate Drink</button>
        </div>
      ) : (
        // Show the GeneratedRecipe component once a recipe is available
        <GeneratedRecipe
          recipe={recipe}
          theme={theme}
          onGenerateAnother={generateAnotherRecipe}
        />
      )}
    </div>
  );
}

export default App;
