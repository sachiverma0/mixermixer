import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import FavoriteToggle from './FavoriteToggle';

function RecipeCard({ recipe, includeToggle }) {
    return (
        <Card sx={{ margin:"10px", backgroundColor: '#ffe3ea' }}>
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
                {includeToggle && <FavoriteToggle itemId={recipe._id} initialFavorite={recipe.favorited} />}
            </CardContent>
        </Card>
    );
}

export default RecipeCard;