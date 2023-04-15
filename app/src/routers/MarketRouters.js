import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from '../components/market/Footer'
import OrderDetail from '../views/market/OrderDetail'
import MarketShop from '../views/market/MarketShop'
import Home from '../views/market/Home'

const MarketRouters = () => (
  <>
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
