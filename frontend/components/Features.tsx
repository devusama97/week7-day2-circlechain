'use client';

import { Box, Typography, Container, Grid, Card } from '@mui/material';
import Image from 'next/image';

const features = [
    { title: 'Access Token Market', description: 'Buy and sell token anytime and anywhere', icon: '🪙' },
    { title: 'User Friendly Interface', description: 'Easy to navigate', icon: '📱' },
    { title: 'Ownership Token control', description: 'Be in control and own as many asset as possible', icon: '🔐' },
];

export default function Features() {
    return (
        <Box sx={{ pt: { xs: 10, md: 10 }, pb: { xs: 0, md: 10 }, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{
                position: 'absolute',
                top: 100,
                left: 200,
                width: '128px',
                height: '128px',
                bgcolor: '#73FDAA',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }} />
            <Container maxWidth={false} sx={{ width: { xs: '100%', md: '1321px' }, mx: 'auto', px: { xs: 2, md: 3 } }}>
                <Typography variant="h3" align="center" sx={{ maxWidth: '1000px', mx: 'auto', fontWeight: 800, mb: 2, fontSize: { xs: '1rem', md: '3rem' } }}>
                    Global Decentralize currency based on blockchain technology
                </Typography>
                <Typography variant="h6" align="center" sx={{ maxWidth: '600px', mx: 'auto', mb: { xs: 0, md: 15 }, color: '#73FDAA', fontSize: { xs: '0.55rem', md: '1.25rem' } }}>
                    Web3 is the latest efficient technology
                </Typography>

                <Grid container spacing={4} alignItems="center">
                      <Box sx={{
                position: 'absolute',
                top: 500,
                left: 100,
                width: '128px',
                height: '128px',
                bgcolor: '#73FDAA',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }} />
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{
                            width: { xs: '80%', md: '100%' },
                            height: { xs: '300px', md: '500px' },
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: { xs: 'auto', md: 0 }
                        }}>
                            <Image
                                src="/imgs/Global Decentralize.png"
                                alt="Global Decentralize"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 10 } }}>
                            {features.map((feature, index) => (
                                <Box 
                                    key={index} 
                                    sx={{ 
                                        background: 'linear-gradient(90deg, rgba(115, 253, 170, 0) 0%, #73FDAA 100%)',
                                        borderRadius: '8px',
                                        p: { xs: 1.5, md: 3 },
                                        textAlign: 'right'
                                    }}
                                >
                                    <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#fff', fontSize: { xs: '0.9rem', md: '1.5rem' } }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#000', fontSize: { xs: '0.7rem', md: '1rem' } }}>
                                        {feature.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
