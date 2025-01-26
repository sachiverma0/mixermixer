import React, { useState, useEffect } from 'react';
import { Checkbox, Button, FormControlLabel, FormGroup, Container, Typography, List, ListItem } from '@mui/material';

function FavoriteFilter({ onApplyFilter }) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Handle the checkbox toggle to filter by favorite status
    const handleFavoriteChange = (e) => {
        setIsFavorite(e.target.checked);
        onApplyFilter(!isFavorite);
    };

    useEffect(() => {
        onApplyFilter(isFavorite); // Ensure the initial filter is applied
    }, [isFavorite, onApplyFilter]);


    return (
        <div>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isFavorite}
                            onChange={handleFavoriteChange}
                            color="primary"
                        />
                    }
                    label="Show only favorites"
                />
            </FormGroup>
        </div>
    );
}

export default FavoriteFilter;
