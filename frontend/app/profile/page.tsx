'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Container, Avatar, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { useGetUserProfileQuery } from '../../services/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const { data: user, isLoading, isError } = useGetUserProfileQuery(undefined, {
        skip: !token
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            router.push('/login');
        } else {
            setToken(storedToken);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        router.push('/');
    };

    if (!token || isLoading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
                <Typography>Error loading profile. Please login again.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar />
            <Container maxWidth="md" sx={{ py: 10 }}>
                <Card sx={{ p: 4 }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Avatar
                            src={user?.picture}
                            sx={{ width: 120, height: 120, mb: 3, border: '4px solid #00ff88' }}
                        />
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                            {user?.firstName} {user?.lastName}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                            {user?.email}
                        </Typography>

                        <Box sx={{ width: '100%', mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <Button variant="contained" color="primary" sx={{ px: 6, width: '200px' }}>
                                Edit Profile
                            </Button>
                            <Button variant="outlined" color="error" onClick={handleLogout} sx={{ px: 6, width: '200px' }}>
                                Logout
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </Box>
    );
}
