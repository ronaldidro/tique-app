import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useToast } from '@chakra-ui/react'
import { setUser } from './reducers/userReducer'
import MarketRouters from './routers/MarketRouters'
import AdminRouters from './routers/AdminRouters'
import services from './services'
import {
  getItemFromLocalStorage,
  getUser,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
  setToastContent,
  showToast
} from './utils'
import Login from './views/admin/Login'

const App = () => {
  const user = getUser() || getItemFromLocalStorage('loggedTiqueAppUser', true) || { logged: false }
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()

  const handleLogin = async values => {
    try {
      const user = await services.post('/auth', values)
      services.setToken(user.token)
      setItemToLocalStorage('loggedTiqueAppUser', JSON.stringify({ ...user, logged: true }))
      dispatch(setUser({ ...user, logged: true }))
      showToast(toast, setToastContent(`Hola ${user.name}`, 'Un gusto volver a verte', 'success', 'subtle', 'top'))
      navigate('/admin/perfil')
    } catch (error) {
      showToast(toast, setToastContent('Ocurrió un error', 'Credenciales incorrectas', 'error', 'subtle', 'top-right'))
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
            <AdminRouters userData={user} handleLogoutAdmin={handleLogout} />
          ) : (
            <Navigate replace to="/admin" />
          )
        }
      />
      <Route path="/*" element={<MarketRouters />} />
    </Routes>
  )
}

export default App
