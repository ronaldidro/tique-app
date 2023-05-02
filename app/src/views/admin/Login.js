import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppLogo from '../../components/AppLogo'
import PasswordField from '../../components/fields/PasswordField'
import TextField from '../../components/fields/TextField'
import { useCustomToast } from '../../hooks'
import { setUser } from '../../reducers/userReducer'
import { request } from '../../services'
import { setItemToLocalStorage, validateRequired } from '../../utils'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showToast } = useCustomToast()

  const handleLoginForm = async values => {
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

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Stack spacing={8} paddingY={12} paddingX={6} align="center">
        <AppLogo />
        <Heading size="md">Ingresa a tu cuenta</Heading>
        <Formik initialValues={{ username: '', password: '' }} onSubmit={handleLoginForm}>
          {() => (
            <Form>
              <Box rounded="lg" bg="white" boxShadow="lg" padding={8}>
                <Stack spacing={4}>
                  <TextField name="username" label="Usuario" validate={validateRequired} />
                  <PasswordField name="password" label="Contraseña" validate={validateRequired} />
                  <Button colorScheme="blue" type="submit">
                    Iniciar sesión
                  </Button>
                </Stack>
              </Box>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  )
}

export default Login
