import PropTypes from 'prop-types'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import { adminSidebarOptions } from '../utils'
import Category from '../views/admin/Category'
import CategoryTable from '../views/admin/CategoryTable'
import Product from '../views/admin/Product'
import ProductTable from '../views/admin/ProductTable'
import Profile from '../views/admin/Profile'
import Shop from '../views/admin/Shop'

const AdminRoutes = ({ userData, handleLogoutAdmin }) => (
  <Sidebar sidebarOptions={adminSidebarOptions} userName={userData.name} handleLogoutButton={handleLogoutAdmin}>
    <Routes>
      <Route path="perfil" element={<Profile user={userData} />} />
      <Route path="tienda" element={<Shop shopId={userData.shop} />} />
      <Route path="categorias" element={<CategoryTable />} />
      <Route path="categorias/agregar" element={<Category />} />
      <Route path="categorias/editar/:categoryId" element={<Category />} />
      <Route path="productos" element={<ProductTable />} />
      <Route path="productos/agregar" element={<Product />} />
      <Route path="productos/editar/:productId" element={<Product />} />
      <Route path="*" element={<Navigate to="perfil" replace />} />
    </Routes>
  </Sidebar>
)

AdminRoutes.propTypes = {
  userData: PropTypes.object,
  handleLogoutAdmin: PropTypes.func
}

export default AdminRoutes
