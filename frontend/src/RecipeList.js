import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeList() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/recipes')
            .then(response => {
                setData(response.data); // Store the response data in state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Data from Flask API:</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
}

export default RecipeList;
