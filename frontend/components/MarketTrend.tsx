'use client';

import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Image from 'next/image';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const generateChartData = () => {
    return Array.from({ length: 20 }, (_, i) => ({
        time: i,
        price: Math.random() * 100 + 50
    }));
};

const trends = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$56,233.54', change: '+1.45%', image: '/imgs/bit.png', data: generateChartData() },
    { symbol: 'ETH', name: 'Ethereum', price: '$4,267.80', change: '+2.21%', image: '/imgs/eth.png', data: generateChartData() },
    { symbol: 'BNB', name: 'Binance', price: '$587.74', change: '+0.82%', image: '/imgs/bnb.png', data: generateChartData() },
    { symbol: 'USDT', name: 'Tether', price: '$0.9998', change: '+0.01%', image: '/imgs/usdt.png', data: generateChartData() },
    { symbol: 'BTC', name: 'Bitcoin', price: '$56,233.54', change: '+1.45%', image: '/imgs/bit.png', data: generateChartData() },
    { symbol: 'ETH', name: 'Ethereum', price: '$4,267.80', change: '+2.21%', image: '/imgs/eth.png', data: generateChartData() },
    { symbol: 'BNB', name: 'Binance', price: '$587.74', change: '+0.82%', image: '/imgs/bnb.png', data: generateChartData() },
    { symbol: 'USDT', name: 'Tether', price: '$0.9998', change: '+0.01%', image: '/imgs/usdt.png', data: generateChartData() },
    { symbol: 'BTC', name: 'Bitcoin', price: '$56,233.54', change: '+1.45%', image: '/imgs/bit.png', data: generateChartData() },
    { symbol: 'ETH', name: 'Ethereum', price: '$4,267.80', change: '+2.21%', image: '/imgs/eth.png', data: generateChartData() },
    { symbol: 'BNB', name: 'Binance', price: '$587.74', change: '+0.82%', image: '/imgs/bnb.png', data: generateChartData() },
    { symbol: 'USDT', name: 'Tether', price: '$0.9998', change: '+0.01%', image: '/imgs/usdt.png', data: generateChartData() },
    { symbol: 'BTC', name: 'Bitcoin', price: '$56,233.54', change: '+1.45%', image: '/imgs/bit.png', data: generateChartData() },
    { symbol: 'ETH', name: 'Ethereum', price: '$4,267.80', change: '+2.21%', image: '/imgs/eth.png', data: generateChartData() },
    { symbol: 'BNB', name: 'Binance', price: '$587.74', change: '+0.82%', image: '/imgs/bnb.png', data: generateChartData() },
    { symbol: 'USDT', name: 'Tether', price: '$0.9998', change: '+0.01%', image: '/imgs/usdt.png', data: generateChartData() },
];

export default function MarketTrend() {
    return (
        <Box sx={{ pt: { xs: 10, md: 10 }, pb: { xs: 0, md: 10 } }}>
            <Container maxWidth={false} sx={{ width: { xs: '100%', md: '100%', lg: '1321px' }, mx: 'auto', px: { xs: 2, md: 3 } }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 6 }}>
                    Market Trend
                </Typography>
                <Grid container spacing={3}>
                    {trends.map((item, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                            <Card sx={{
                                p: 1,
                                transition: 'transform 0.3s',
                                border: '2px solid #73FDAAE3',
                                '&:hover': { transform: 'translateY(-5px)', borderColor: '#73FDAAE3' }
                            }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{
                                                width: 32,
                                                height: 32,
                                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden'
                                            }}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.symbol}
                                                    width={24}
                                                    height={24}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </Box>
                                            <Typography variant="subtitle1" fontWeight={700}>{item.symbol}</Typography>
                                            <Typography variant="caption" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', px: 1, borderRadius: 1 }}>{item.name}</Typography>
                                        </Box>
                                        <TrendingUpIcon sx={{ color: '#73FDAAE3', fontSize: '1rem' }} />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.price}</Typography>
                                            <Typography variant="body2" sx={{ color: '#73FDAAE3' }}>{item.change}</Typography>
                                        </Box>
                                        <Box sx={{ width: '50%', height: 40 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={item.data}>
                                                    <Line 
                                                        type="monotone" 
                                                        dataKey="price" 
                                                        stroke="#73FDAAE3" 
                                                        strokeWidth={2}
                                                        dot={false}
                                                        activeDot={{ r: 4, fill: '#73FDAAE3' }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
