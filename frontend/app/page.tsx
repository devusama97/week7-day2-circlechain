import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import MarketTrend from "@/components/MarketTrend";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Hero />
      <Features />
      <MarketTrend />
      <Newsletter />
      <Footer />
    </Box>
  );
}
