import { Box } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from '../components/market/Footer'
import Navbar from '../components/market/Navbar'
import Home from '../pages/market/Home'
import MarketShop from '../pages/market/MarketShop'
import OrderCheckout from '../pages/market/OrderCheckout'
import ShopCart from '../pages/market/ShopCart'

const ShopRoutes = () => (
  <>
    <Navbar />
    <Box as="main" marginTop={20}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tienda/:id" element={<MarketShop />} />
        <Route path="carrito" element={<ShopCart />} />
        <Route path="procesar" element={<OrderCheckout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
    <Footer />
  </>
)

export default ShopRoutes
