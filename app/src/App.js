import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import Footer from './components/market/Footer'
import OrderDetail from './views/market/OrderDetail'
import CompanyProducts from './views/market/CompanyProducts'
import Home from './views/market/Home'

const App = () => {
  return (
    <Container maxW="5xl">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compania/:id" element={<CompanyProducts />} />
        <Route path="/pedido" element={<OrderDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Container>
  )
}

export default App
