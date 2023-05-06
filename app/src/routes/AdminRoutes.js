import PropTypes from 'prop-types'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import CategoryAdd from '../pages/admin/CategoryAdd'
import CategoryEdit from '../pages/admin/CategoryEdit'
import CategoryTable from '../pages/admin/CategoryTable'
import ProductAdd from '../pages/admin/ProductAdd'
import ProductEdit from '../pages/admin/ProductEdit'
import ProductTable from '../pages/admin/ProductTable'
import Profile from '../pages/admin/Profile'
import Shop from '../pages/admin/Shop'
import { adminSidebarOptions } from '../utils'

const AdminRoutes = ({ userData }) => (
  <Sidebar sidebarOptions={adminSidebarOptions} userName={userData.name}>
    <Routes>
      <Route path="perfil" element={<Profile user={userData} />} />
      <Route path="tienda" element={<Shop shopId={userData.shop} />} />
      <Route path="categorias" element={<CategoryTable />} />
      <Route path="categorias/agregar" element={<CategoryAdd />} />
      <Route path="categorias/editar/:categoryId" element={<CategoryEdit />} />
      <Route path="productos" element={<ProductTable />} />
      <Route path="productos/agregar" element={<ProductAdd />} />
      <Route path="productos/editar/:productId" element={<ProductEdit />} />
      <Route path="*" element={<Navigate to="perfil" replace />} />
    </Routes>
  </Sidebar>
)

AdminRoutes.propTypes = {
  userData: PropTypes.object,
  handleLogoutAdmin: PropTypes.func
}

export default AdminRoutes
