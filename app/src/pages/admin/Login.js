import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/admin/LoginForm'
import { useCustomToast } from '../../hooks'
import { setUser } from '../../reducers/userReducer'
import { request } from '../../services'
import { setItemToLocalStorage, toastBase } from '../../utils'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showToast } = useCustomToast()
  const loginFormRef = useRef()

  const handleSignInForm = async values => {
    try {
      const response = await request('/auth', 'POST', values)
      const userData = { ...response, username: values.username, logged: true }

      setItemToLocalStorage('loggedTiqueAppUser', JSON.stringify(userData))
      dispatch(setUser(userData))
      navigate('/admin/perfil')

      showToast({
        ...toastBase,
        title: 'Bienvenido',
        description: `Hola, ${userData.name}`,
        status: 'success'
      })
    } catch (error) {
      showToast({ ...toastBase, description: error.response.data.error, position: 'top-left' })
    }
  }

  const handleSignUpForm = async values => {
    try {
      const response = await request('/users', 'POST', values)

      if (response.id) {
        loginFormRef.current.setIsSignIn(true)

        showToast({
          ...toastBase,
          title: 'Cuenta creada',
          description: 'Inicia sesión para configurar tu tienda',
          position: 'top-left',
          status: 'success'
        })
      } else {
        showToast({ ...toastBase, description: 'Ocurrió un error al crear tu cuenta', position: 'top-left' })
      }
    } catch (error) {
      showToast({ ...toastBase, description: error.response.data.error, position: 'top-left' })
    }
  }

  return <LoginForm handleSignIn={handleSignInForm} handleSignUp={handleSignUpForm} ref={loginFormRef} />
}

export default Login
