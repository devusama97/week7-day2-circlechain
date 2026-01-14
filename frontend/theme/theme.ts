'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00ff88', // Neon Green from Figma
        },
        background: {
            default: '#000000', // Pure black
            paper: 'transparent',   // Transparent
        },
        text: {
            primary: '#ffffff',
            secondary: '#8b949e',
        },
    },
    typography: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 30,
                    textTransform: 'none',
                    fontWeight: 600,
                },
                containedPrimary: {
                    background: 'linear-gradient(90deg, #00ff88 0%, #00e5ff 100%)',
                    color: '#000',
                    '&:hover': {
                        background: 'linear-gradient(90deg, #00e5ff 0%, #00ff88 100%)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    borderRadius: 20,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
    },
});

export default theme;
