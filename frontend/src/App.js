import React, { useState } from 'react';
import RecipeList from "./RecipeList";
import GeneratedRecipe from "./GeneratedRecipe";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  Divider,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
        body: JSON.stringify({ theme }),
      });
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };

  const generateAnotherRecipe = () => {
    setRecipe(null);
    setTheme("");
  };

  // Define a custom theme with Coca-Cola brand colors
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#e7223a', // Coca-Cola red
      },
      secondary: {
        main: '#fff8ff', // Light pink
      },
      background: {
        default: '#360103', // Dark red
        paper: '#6f1712', // Medium dark red
      },
      text: {
        primary: '#ba432e', // Light red
        secondary: '#fff8ff', // Light pink
      },
    },
    typography: {
      fontFamily: `'Roboto', sans-serif`, // Default font
      h3: {
        fontWeight: 700, // Bold for headings
        color: '#e7223a', // Coca-Cola red
      },
      body1: {
        fontSize: '1rem',
        color: '#ba432e', // Light red
      },
      h5: {
        fontFamily: `'Roboto', sans-serif`, // Default font for h5
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Container
        maxWidth="sm"
        sx={{
          py: 5,
          backgroundImage: 'url(/path/to/your/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
        }}
      >
        {/* Coca-Cola Logo */}
        <Box
          component="img"
          src="/coca-cola.png"
          alt="Coca-Cola Logo"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            width: 50,
            height: 50,
          }}
        />

        <div className="App">
          {/* If no recipe is generated, show the RecipeList or form */}
          {!recipe ? (
            <div>
              <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: '#fff8ff' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: `'Lobster', cursive` }}>
                  Coca-Cola Drink Mix Generator
                </Typography>
                <Typography variant="body1">
                  Enter your party theme below to get a custom drink suggestion!
                </Typography>
              </Paper>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  generateRecipe(theme);
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <TextField
                  label="Party Theme"
                  placeholder="Enter your party theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  required
                  fullWidth
                  InputProps={{
                    style: { fontFamily: 'Roboto', color: '#e7223a' },
                  }}
                />
                <Button type="submit" variant="contained" color="primary" size="large">
                  Generate Drink
                </Button>
              </Box>
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
      </Container>
    </ThemeProvider>
  );
}

export default App;