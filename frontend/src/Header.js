import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static" style={{ width: '100%', height: 'auto', backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Toolbar style={{ padding: 0, position: 'relative', height: '200px' }}>
                <img
                    src="banner.png" // Path to your banner image
                    alt="Banner"
                    style={{
                        width: '100%', // Make the image fill the width of the container
                        height: '100%', // Make the image fill the height of the container
                        objectFit: 'cover', // Ensure the image covers the area
                    }}
                />
                <RouterLink to="/" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <img
                        src="logo.png" // Path to your clickable image
                        alt="Logo"
                        style={{
                            width: '', // Set the size of the clickable image
                            height: 'auto',
                            cursor: 'pointer',
                        }}
                    />
                </RouterLink>
            </Toolbar>
        </AppBar>
    );
};

export default Header;