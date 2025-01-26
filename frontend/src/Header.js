import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
    return (
            <Toolbar style={{ padding: 0, position: 'relative', height: '200px' }}>
            
                <RouterLink to="/" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <img
                        src="logo.svg" // Path to your clickable image
                        alt="Logo"
                        style={{
                            width: '100%', // Set the size of the clickable image
                            height: 'auto',
                            cursor: 'pointer',
                            alignContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            margin: 'auto',
                            transform: 'scale(3)',
                            translate: '12% ',
                        }}
                    />
                </RouterLink>
            </Toolbar>
    );
};

export default Header;