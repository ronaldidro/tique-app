import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useToast } from '@chakra-ui/react'
import { setUser } from './reducers/userReducer'
import MarketRouters from './routers/MarketRouters'
import AdminRouters from './routers/AdminRouters'
import { request } from './services'
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
      const response = await request('/auth', 'POST', values)
      const userData = { ...response, username: values.username, logged: true }

      setItemToLocalStorage('loggedTiqueAppUser', JSON.stringify(userData))
      dispatch(setUser(userData))
      showToast(toast, setToastContent(`Hola ${userData.name}`, 'Un gusto volver a verte', 'success', 'subtle', 'top'))
      navigate('/admin/perfil')
    } catch (error) {
      showToast(toast, setToastContent('Error', error.response.data.error, 'error', 'subtle', 'top-right'))
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
