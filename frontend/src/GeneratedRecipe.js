import React, { useState } from "react";
import { Alert, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import RecipeCard from "./RecipeCard"
import Header from "./Header";

const GeneratedRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const [alert, setAlert] = useState({ message: "", severity: "success" });



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
        setAlert({ message: "Recipe saved :D", severity: "success" });
        setTimeout(() => {
          navigate("/recipes");
        }, 500);
      } else {
        throw new Error(data.message || "Failed to save recipe");
      }
    } catch (error) {
      setAlert({
        message: `Failed to save recipe: ${error.message || "Unknown error"}`,
        severity: "error",
      });
    }
  };

  const handleGenerateAnother = () => {
    // Navigate back to the main page and pass the theme to start again
    navigate("/", { state: { theme } });
  };

  return (
    <div>
      <Header />
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>

        <RecipeCard recipe={recipe} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', // Horizontally center the items
            width: '100%',
          }}
        >
          {/* Generate Another Recipe Button */}
          <Button variant="outlined"
            style={{ padding: "10px 15px", margin: "10px", cursor: "pointer" }}
            onClick={handleGenerateAnother}
          >
            Try Again
          </Button>

          {/* Save Recipe Button */}
          <Button variant="contained"
            style={{ padding: "10px 15px", margin: "10px", cursor: "pointer" }}
            onClick={handleSave}
          >
            Save Recipe
          </Button>
        </Box>

        {/* Conditionally render the Alert */}
        {alert.message && (
          <Alert severity={alert.severity} style={{ marginTop: "20px" }}>
            {alert.message}
          </Alert>
        )}


      </div>
    </div>

  );
};

export default GeneratedRecipe;
