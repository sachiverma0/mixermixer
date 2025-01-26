import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";

function FavoriteToggle({ itemId, initialFavorite }) {
    const [favorited, setFavorited] = useState(initialFavorite);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        try {
            const response = await axios.patch("http://127.0.0.1:5000/update-favorite", {
                itemId,
                favorited: !favorited, // Send the toggled state to the server
            });
            if (response.status === 200) {
                setFavorited(!favorited); // Update state only if the server responds successfully
            } else {
                console.error("Failed to update favorite status.");
            }
        } catch (error) {
            console.error("Error updating favorite status:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <IconButton
            onClick={handleToggle}
            color={favorited ? "error" : "default"}
            aria-label={favorited ? "Unfavorite" : "Favorite"}
            disabled={loading} // Disable button while loading
            sx={{ display: "flex", float:"right" }}
           
        >
            {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
    );
}

export default FavoriteToggle;
