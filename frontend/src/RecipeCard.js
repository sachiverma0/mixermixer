import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function RecipeCard({ recipe }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{recipe.name}</Typography>
                Ingredients:
                {recipe.ingredients.map((ingredient, index) => (
                    <Typography variant="body2">- {ingredient.amount} {ingredient.unit} {ingredient.name}</Typography>
                ))}

                Instructions:
                {recipe.instructions.map((instruction, index) => (
                    <Typography variant="body2">{instruction}</Typography>
                ))}
            </CardContent>
        </Card>
    );
}

export default RecipeCard;
