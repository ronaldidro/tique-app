import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/admin/LoginForm'
import { useCustomToast } from '../../hooks'
import { setUser } from '../../reducers/userReducer'
import { request } from '../../services'
import { setItemToLocalStorage } from '../../utils'

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

  const handleSignUpForm = async values => {
    try {
      const response = await request('/users', 'POST', values)

      if (response.id) {
        loginFormRef.current.setIsSignIn(true)

        showToast({
          title: 'Cuenta creada',
          description: 'Inicia sesión para configurar tu tienda',
          status: 'success',
          position: 'top-left',
          variant: 'subtle'
        })
      } else {
        showToast({
          title: 'Error',
          description: 'Ocurrió un error al crear tu cuenta',
          status: 'error',
          position: 'top-left',
          variant: 'subtle'
        })
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: error.response.data.error,
        status: 'error',
        position: 'top-left',
        variant: 'subtle'
      })
    }
  }

  return <LoginForm handleSignIn={handleSignInForm} handleSignUp={handleSignUpForm} ref={loginFormRef} />
}

export default Login
