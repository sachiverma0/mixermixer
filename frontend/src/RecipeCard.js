import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import FavoriteToggle from './FavoriteToggle';

function RecipeCard({ recipe, includeToggle }) {
    return (
        <Card sx={{ margin: "10px", backgroundColor: '#fae6e7' }}>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', // Horizontally centers the text
                        width: '100%',
                    }}
                >
                    <Typography variant="h5" sx={{ fontFamily: 'Fira Sans', fontWeight: 'bold' }}>
                        {recipe.name}
                    </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontFamily: 'Fira Sans', marginTop: 2, fontWeight:'bold' }}>
                    Ingredients:
                </Typography>
                {recipe.ingredients.map((ingredient, index) => (
                    <Typography variant="body2" key={index} sx={{ fontFamily: 'Fira Sans' }}>
                        - {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </Typography>
                ))}

                <Typography variant="h6" sx={{ fontFamily: 'Fira Sans', marginTop: 2, fontWeight:'bold'}}>
                    Instructions:
                </Typography>
                {recipe.instructions.map((instruction, index) => (
                    <Typography variant="body2" key={index} sx={{ fontFamily: 'Fira Sans' }}>
                        {instruction}
                    </Typography>
                ))}
                {includeToggle && <FavoriteToggle itemId={recipe._id} initialFavorite={recipe.favorited} />}
            </CardContent>
        </Card>
    );
}

export default RecipeCard;