import { Navigate, Route, Routes } from 'react-router-dom'
import { adminSidebarOptions } from '../utils'
import Sidebar from '../components/admin/Sidebar'
import ProductTable from '../views/admin/ProductTable'
import Profile from '../views/admin/Profile'

const AdminRouters = () => (
  <Sidebar sidebarOptions={adminSidebarOptions}>
    <Routes>
      <Route path="perfil" element={<Profile />} />
      <Route path="productos" element={<ProductTable />} />
      <Route path="*" element={<Navigate to="perfil" replace />} />
    </Routes>
  </Sidebar>
)

export default AdminRouters
