import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Button,
    Container,
    TextField,
    Typography,
    Box,
    Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";

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
                main: "#ba432e", // Coca-Cola red
                fontFamily: "sans-serif",
            },
            secondary: {
                main: "#ffffff", // White
                fontFamily: "sans-serif",
            },
            text: {
                primary: "#ba432e", // Black
                secondary: "#ba432e", // Light red
                fontFamily: "sans-serif",
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
                    backgroundColor: "#ffffff", // Set the background color to white
                }}
            >
                <div>
                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            sx={{ fontFamily: 'sans-serif'}}
                            align="center"
                            fontccolor="#7D1128"
                            fontSize={"32px"}
                        >
                            need a mixer 🍸 for your mixer 👯?

                        </Typography>
                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            sx={{ fontFamily: 'sans-serif'}}
                            align="center"
                            fontccolor="#7D1128"
                            fontSize={"32px"}
                        >
                        tell us a theme to get started!
                        </Typography>
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
                                style: { fontFamily: "sans-serif", color: "#7D1128", padding: "10px !important" },
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