import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from '../components/market/Footer'
import Navbar from '../components/market/Navbar'
import Home from '../views/market/Home'
import MarketShop from '../views/market/MarketShop'
import OrderDetail from '../views/market/OrderDetail'

const MarketRouters = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="tienda/:id" element={<MarketShop />} />
      <Route path="pedido" element={<OrderDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Footer />
  </>
)

export default MarketRouters
