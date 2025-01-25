import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

function RecipeCard({ recipe }) {
    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', // Horizontally centers the text
                        width: '100%',
                    }}
                >
                    <Typography variant="h5">{recipe.name}</Typography></Box>
                Ingredients:
                {recipe.ingredients.map((ingredient, index) => (
                    <Typography variant="body2" key={index}>- {ingredient.amount} {ingredient.unit} {ingredient.name}</Typography>
                ))}

                Instructions:
                {recipe.instructions.map((instruction, index) => (
                    <Typography variant="body2" key={index}>{instruction}</Typography>
                ))}
            </CardContent>
        </Card>
    );
}

export default RecipeCard;
