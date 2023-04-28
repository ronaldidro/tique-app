import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useCustomToast } from './hooks'
import { setUser } from './reducers/userReducer'
import AdminRoutes from './routes/AdminRoutes'
import MarketRoutes from './routes/MarketRoutes'
import { request } from './services'
import { getItemFromLocalStorage, getUser, removeItemFromLocalStorage, setItemToLocalStorage } from './utils'
import Login from './views/admin/Login'

const App = () => {
  const user = getUser() || getItemFromLocalStorage('loggedTiqueAppUser') || { logged: false }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showToast } = useCustomToast()

  const handleLogin = async values => {
    try {
      const response = await request('/auth', 'POST', values)
      const userData = { ...response, username: values.username, logged: true }

      setItemToLocalStorage('loggedTiqueAppUser', JSON.stringify(userData))
      dispatch(setUser(userData))
      navigate('/admin/perfil')
      showToast({
        title: `Hola ${userData.name}`,
        description: 'Bienvenido',
        status: 'success',
        position: 'top',
        variant: 'subtle'
      })
    } catch (error) {
      showToast({
        title: 'Error',
        description: error.response.data.error,
        status: 'error',
        position: 'top-right',
        variant: 'subtle'
      })
    }
  }

  const handleLogout = () => {
    removeItemFromLocalStorage(['loggedTiqueAppUser'])
    dispatch(setUser({ logged: false }))
    navigate('/admin')
  }

  return (
    <Routes>
      <Route
        path="admin"
        element={!user.logged ? <Login handleLoginForm={handleLogin} /> : <Navigate replace to="/admin/perfil" />}
      />
      <Route
        path="admin/*"
        element={
          user.logged ? (
            <AdminRoutes userData={user} handleLogoutAdmin={handleLogout} />
          ) : (
            <Navigate replace to="/admin" />
          )
        }
      />
      <Route path="/*" element={<MarketRoutes />} />
    </Routes>
  )
}

export default App
