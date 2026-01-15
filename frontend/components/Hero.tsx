'use client';

import { Box, Typography, Button, Container, Grid } from '@mui/material';
import Image from 'next/image';

export default function Hero() {
    return (
        <Box sx={{ pt: 8, pb: 0, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{
                position: 'absolute',
                top: 100,
                left: 65,
                width: '128px',
                height: '128px',
                bgcolor: '#73FDAA',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: 100,
                right: 80,
                width: '128px',
                height: '128px',
                bgcolor: '#73FDAA',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }} />
            <Container maxWidth={false} sx={{ width: { xs: '100%', md: '100%', lg: '1321px' }, mx: 'auto', px: { xs: 2, md: 3 } }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', md: '3.8rem' } }}>
                                Save, Buy and Sell Your blockchain asset
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff', mb: 4, fontSize: { xs: '1rem', md: '1.6rem' }, maxWidth: { xs: '100%', md: '500px' }, mx: { xs: 'auto', md: 0 } }}>
                                The easy to manage and trade your cryptocurrency asset
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { xs: 'center', md: 'flex-start' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <Button 
                                variant="contained" 
                                sx={{ 
                                    px: { xs: 4, md: 4 }, 
                                    py: 0.5, 
                                    background: '#BBFFFF !important',
                                    backgroundColor: '#BBFFFF !important',
                                    color: '#000',
                                    borderRadius: 4,
                                    width: '220px',
                                    height: '48px',
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    boxShadow: 'none',
                                    '&:hover': {
                                        background: '#73FDAA !important',
                                        backgroundColor: '#73FDAA !important',
                                        boxShadow: 'none'
                                    },
                                    '&:active': {
                                        background: '#73FDAA !important',
                                        backgroundColor: '#73FDAA !important',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                Connect Wallet
                            </Button>
                            <Button 
                                variant="outlined" 
                                sx={{ 
                                    px: { xs: 4, md: 4 }, 
                                    py: 0.5,
                                    background: '#fff !important',
                                    backgroundColor: '#fff !important',
                                    color: '#000', 
                                    borderColor: '#fff',
                                    borderRadius: 4,
                                    width: '220px',
                                    height: '48px',
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    boxShadow: 'none',
                                    '&:hover': {
                                        background: '#73FDAA !important',
                                        backgroundColor: '#73FDAA !important',
                                        borderColor: '#73FDAA',
                                        boxShadow: 'none'
                                    },
                                    '&:active': {
                                        background: '#73FDAA !important',
                                        backgroundColor: '#73FDAA !important',
                                        borderColor: '#73FDAA',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                Start Trading
                            </Button>
                        </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: { xs: '350px', md: '500px' },
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'visible'
                            }}
                        >
                            <Image
                                src="/imgs/hero img.png"
                                alt="Blockchain Hero Image"
                                width={1000}
                                height={1000}
                                style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
