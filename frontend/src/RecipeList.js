import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import RecipeCard from './RecipeCard';
import Header from './Header';
import { Typography } from '@mui/material';


function RecipeList() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/recipes')
            .then(response => {
                setData(response.data); // Store the response data in state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <Header />
                    <Grid container spacing={2}>
                {/* Map through the data array and create a Card for each object */}
                {data ? data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <RecipeCard recipe={item} includeToggle={true} />
                    </Grid>
                )) : (
                    <p>Loading...</p>
                )}
            </Grid>
        </div>
    );
}

export default RecipeList;
