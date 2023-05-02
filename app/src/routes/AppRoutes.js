import { Navigate, Route, Routes } from 'react-router-dom'
import { getUser } from '../utils'
import Login from '../views/admin/Login'
import AdminRoutes from './AdminRoutes'
import ShopRoutes from './ShopRoutes'

const AppRoutes = () => {
  const user = getUser()

  return (
    <Routes>
      <Route path="admin" element={!user ? <Login /> : <Navigate replace to="/admin/perfil" />} />
      <Route path="admin/*" element={user ? <AdminRoutes userData={user} /> : <Navigate replace to="/admin" />} />
      <Route path="/*" element={<ShopRoutes />} />
    </Routes>
  )
}

export default AppRoutes
