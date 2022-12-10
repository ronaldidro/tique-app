import { Container } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from '../components/market/Footer'
import OrderDetail from '../views/market/OrderDetail'
import CompanyProducts from '../views/market/CompanyProducts'
import Home from '../views/market/Home'

const MarketRouters = () => (
  <Container maxW="5xl" paddingX={{ base: 0, md: 4 }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="compania/:id" element={<CompanyProducts />} />
      <Route path="pedido" element={<OrderDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Footer />
  </Container>
)

export default MarketRouters
