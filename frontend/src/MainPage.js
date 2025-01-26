import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";

import {
    Button,
    Container,
    TextField,
    Typography,
    Box,
    Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function MainPage({ theme_og }) {
    const location = useLocation();
    const [theme, setTheme] = useState(location.state?.theme, ""); // Use theme from navigation state if available
    const navigate = useNavigate(); // React Router's navigation hook

    const generateRecipe = async (theme) => {
        try {
            // API call to the backend to generate a recipe
            const response = await fetch("http://127.0.0.1:5000/generate_recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ theme }),
            });
            const data = await response.json();

            // Navigate to the GeneratedRecipe page with the recipe data
            navigate("/generated-recipe", { state: { recipe: data, theme } });
        } catch (error) {
            console.error("Error generating recipe:", error);
        }
    };

    // Define a custom theme with Coca-Cola brand colors
    const customTheme = createTheme({
        palette: {
            primary: {
                main: "#e7223a", // Coca-Cola red
            },
            secondary: {
                main: "#fff8ff", // Light pink
            },
            background: {
                default: "#360103", // Dark red
                paper: "#6f1712", // Medium dark red
            },
            text: {
                primary: "#ba432e", // Light red
                secondary: "#fff8ff", // Light pink
            },
        },
        typography: {
            fontFamily: `'Roboto', sans-serif`, // Default font
            h3: {
                fontWeight: 700, // Bold for headings
                color: "#e7223a", // Coca-Cola red
            },
            body1: {
                fontSize: "1rem",
                color: "#ba432e", // Light red
            },
        },
    });

    const goToRecipes = () => {
        // Navigate back to the main page and pass the theme to start again
        navigate("/recipes");
    };

    return (
        <ThemeProvider theme={customTheme}>
            <Header />
            <Container
                maxWidth="sm"
                sx={{
                    py: 5,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <div>
                    <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: "center" }}>
                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            sx={{ fontFamily: `'Lobster', cursive` }}
                        >
                            Mixer Mixer
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
                            display: "flex",
                            flexDirection: "column",
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
                                style: { fontFamily: "Roboto", color: "#e7223a" },
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" size="large">
                            Generate Drink
                        </Button>
                        <Button variant="outlined" onClick={goToRecipes}>
                            See Recipes
                        </Button>
                    </Box>
                </div>


            </Container>
        </ThemeProvider>
    );
}

export default MainPage;