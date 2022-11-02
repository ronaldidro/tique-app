import { Navigate, Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'
import Sidebar from '../components/admin/Sidebar'
import { adminSidebarOptions } from '../utils'
import ProductTable from '../views/admin/ProductTable'
import Profile from '../views/admin/Profile'

const AdminRouters = ({ userData, handleLogoutAdmin }) => (
  <Sidebar sidebarOptions={adminSidebarOptions} userName={userData?.name} handleLogoutButton={handleLogoutAdmin}>
    <Routes>
      <Route path="perfil" element={<Profile />} />
      <Route path="compania" element={<Profile />} />
      <Route path="productos" element={<ProductTable />} />
      <Route path="*" element={<Navigate to="perfil" replace />} />
    </Routes>
  </Sidebar>
)

AdminRouters.propTypes = {
  userData: PropTypes.object,
  handleLogoutAdmin: PropTypes.func
}

export default AdminRouters
