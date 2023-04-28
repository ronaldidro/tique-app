import { Box } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from '../components/market/Footer'
import Navbar from '../components/market/Navbar'
import Home from '../views/market/Home'
import MarketShop from '../views/market/MarketShop'
import ShopCart from '../views/market/ShopCart'

const MarketRoutes = () => (
  <>
    <Navbar />
    <Box as="main" marginTop={20}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tienda/:id" element={<MarketShop />} />
        <Route path="carrito" element={<ShopCart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
    <Footer />
  </>
)

export default MarketRoutes
