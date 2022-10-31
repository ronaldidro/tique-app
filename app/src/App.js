import { Route, Routes } from 'react-router-dom'
import Footer from './components/market/Footer'
import MarketRouters from './routers/MarketRouters'
import AdminRouters from './routers/AdminRouters'
import Login from './views/admin/Login'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MarketRouters />} />
        <Route path="admin/*" element={<AdminRouters />} />
        <Route path="/sesion" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
