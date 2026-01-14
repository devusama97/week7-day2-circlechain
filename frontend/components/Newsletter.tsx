'use client';

import { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Alert, Snackbar } from '@mui/material';
import { useSubscribeToNewsletterMutation } from '../services/api';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [subscribe, { isLoading, isSuccess, isError, error }] = useSubscribeToNewsletterMutation();
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await subscribe({ email }).unwrap();
            setOpen(true);
            setEmail('');
        } catch (err) {
            setOpen(true);
        }
    };

    return (
        <Box sx={{ pt: { xs: 10, md: 10 }, pb: { xs: 0, md: 10 }, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{
                position: 'absolute',
                top: 80,
                right: 250,
                width: '128px',
                height: '128px',
                bgcolor: '#73FDAA',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }} />

             <Box sx={{
                position: 'absolute',
                top: 80,
                left: 250,
                width: '128px',
                height: '128px',
                bgcolor: '#73FDAA',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }} />
            <Container maxWidth={false} sx={{ width: { xs: '100%', md: '1321px' }, mx: 'auto', px: { xs: 2, md: 3 } }}>
                <Box sx={{
                    bgcolor: 'rgba(1, 0, 16, 0.8)',
                    borderRadius: 4,
                    p: { xs: 3, md: 6 },
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    maxWidth: '900px',
                    mx: 'auto',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 20px #73FDAA7A'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        bgcolor: 'rgba(0, 255, 136, 0.1)',
                        filter: 'blur(100px)',
                        bottom: '-150px',
                        right: '-150px'
                    }} />

                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: '#fff', fontSize: { xs: '0.9rem', md: '2.125rem' } }}>
                        Want to be aware of all update
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                        maxWidth: '800px',
                        mx: 'auto',
                        alignItems: 'center'
                    }}>
                        <TextField
                            fullWidth
                            placeholder="Enter your email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                bgcolor: '#fff',
                                borderRadius: 2,
                                flex: 3,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: '2px solid #73FDAA'
                                    },
                                    '&:hover fieldset': {
                                        border: '2px solid #73FDAA'
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: '2px solid #73FDAA'
                                    }
                                },
                                '& .MuiInputBase-input': {
                                    color: '#000'
                                }
                            }}
                            required
                            type="email"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                px: 8,
                                py: 0.5,
                                borderRadius: 4,
                                minWidth: '180px',
                                height: '48px',
                                background: '#BBFFFF !important',
                                backgroundColor: '#BBFFFF !important',
                                color: '#000',
                                boxShadow: 'none',
                                '&:hover': {
                                    background: '#73FDAA !important',
                                    backgroundColor: '#73FDAA !important',
                                    boxShadow: 'none'
                                },
                                '&:active': {
                                    background: '#BBFFFF !important',
                                    backgroundColor: '#BBFFFF !important',
                                    boxShadow: 'none'
                                },
                                '&:disabled': {
                                    background: '#BBFFFF !important',
                                    backgroundColor: '#BBFFFF !important'
                                }
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Subscribing...' : 'Subscribe'}
                        </Button>
                    </Box>
                </Box>
            </Container>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                {isSuccess ? (
                    <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                        Successfully subscribed to the newsletter!
                    </Alert>
                ) : (
                    <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                        {(error as any)?.data?.message || 'Failed to subscribe. Please try again.'}
                    </Alert>
                )}
            </Snackbar>
        </Box>
    );
}
