'use client';

import { Box, Typography, Button, Container, Card, CardContent, TextField, Divider, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLoginMutation } from '../../services/api';

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useLoginMutation();
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.get('registered') === 'true') {
            setShowSuccess(true);
        }
    }, [searchParams]);

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'https://week7-day2-circlechain.onrender.com'}/auth/google`;
    };

    const handleManualLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await login({ email, password }).unwrap();
            localStorage.setItem('token', result.access_token);
            router.push('/profile');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            py: 4
        }}>
            <Container maxWidth="sm">
                <Card sx={{ p: 4 }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
                            Log in to your account to continue
                        </Typography>

                        {showSuccess && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                Account created successfully! Please login.
                            </Alert>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {(error as any)?.data?.message || 'Invalid credentials'}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleManualLogin} sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{ mb: 3 }}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    background: '#BBFFFF',
                                    color: '#000',
                                    fontWeight: 600,
                                    '&:hover': {
                                        background: '#73FDAA'
                                    }
                                }}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </Box>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>OR</Typography>
                        </Divider>

                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                color: '#fff',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                '&:hover': {
                                    borderColor: '#00ff88',
                                    bgcolor: 'rgba(0, 255, 136, 0.05)'
                                }
                            }}
                        >
                            Sign in with Google
                        </Button>

                        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary', textAlign: 'center' }}>
                            Don't have an account?{' '}
                            <Link href="/signup" style={{ color: '#00ff88', textDecoration: 'none' }}>
                                Sign up
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</Box>}>
            <LoginContent />
        </Suspense>
    );
}