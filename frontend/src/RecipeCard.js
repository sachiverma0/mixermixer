import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function RecipeCard({ recipe }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{recipe.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {recipe.description || 'No description available'}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RecipeCard;
