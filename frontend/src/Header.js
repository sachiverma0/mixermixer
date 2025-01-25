import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar
                style={{
                    position: 'relative',
                    backgroundImage: 'url(banner.png)', // Path to your background image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <RouterLink to="/" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <img
                        src="coca-cola.png" // Path to your clickable image
                        alt="Banner"
                        style={{
                            width: '100px', // Set the size of the clickable image
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
