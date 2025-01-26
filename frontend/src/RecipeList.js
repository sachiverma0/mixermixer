import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import RecipeCard from './RecipeCard';
import Header from './Header';
import FavoriteFilter from './FavoriteFilter';

function RecipeList() {
    const [data, setData] = useState(null);
    const [filteredItems, setFilteredItems] = useState(data); // Initially, show all items

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/recipes')
            .then(response => {
                setData(response.data); // Store the response data in state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const applyFavoriteFilter = (isFavorite) => {
        if (isFavorite) {
            setFilteredItems(data.filter((item) => item.favorited)); // Filter to show only favorite items
        } else {
            setFilteredItems(data); // Show all items when the checkbox is unchecked
        }
    };

    return (
        <div>
            <Header />
            <h1>Recipes</h1>
            <FavoriteFilter onApplyFilter={applyFavoriteFilter} />
            <Grid container spacing={2}>
                {/* Map through the data array and create a Card for each object */}
                {filteredItems && filteredItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <RecipeCard recipe={item} includeToggle={true} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default RecipeList;
