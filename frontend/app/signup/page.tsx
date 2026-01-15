'use client';

import { Box, Typography, Button, Container, Card, CardContent, TextField, Divider, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSignupMutation } from '../../services/api';

export default function SignupPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signup, { isLoading, error }] = useSignupMutation();
    const [passwordError, setPasswordError] = useState('');

    const handleGoogleSignup = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'https://week7-day2-circlechain.onrender.com'}/auth/google`;
    };

    const handleManualSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        
        if (password !== confirmPassword) {
            setPasswordError("Passwords don't match!");
            return;
        }
        
        try {
            await signup({ firstName, lastName, email, password }).unwrap();
            router.push('/login?registered=true');
        } catch (err) {
            console.error('Signup failed:', err);
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
                            Join Us
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
                            Create an account to start your journey
                        </Typography>

                        {(error || passwordError) && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {passwordError || (error as any)?.data?.message || 'Signup failed'}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleManualSignup} sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="First Name"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
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
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                                {isLoading ? 'Signing up...' : 'Sign Up'}
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
                            onClick={handleGoogleSignup}
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
                            Sign up with Google
                        </Button>

                        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary', textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link href="/login" style={{ color: '#00ff88', textDecoration: 'none' }}>
                                Login
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}