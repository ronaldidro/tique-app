import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { decodeToken, isExpired } from 'react-jwt'
import { useDispatch } from 'react-redux'
import PasswordField from '../../components/fields/PasswordField'
import TextField from '../../components/fields/TextField'
import { useCustomToast } from '../../hooks'
import { setUser } from '../../reducers/userReducer'
import { request } from '../../services'
import { setItemToLocalStorage, toastBase, validateRequired } from '../../utils'

const Profile = ({ user }) => {
  const dispatch = useDispatch()
  const { showToast } = useCustomToast()

  useEffect(() => {
    if (isExpired(user.token)) {
      dispatch(setUser(null))
      window.location = '/admin'
    }
  }, [user])

  const handleSubmit = async values => {
    try {
      const { id: userId } = decodeToken(user.token)
      const { id, name, username } = await request(`/users/${userId}`, 'PATCH', values)

      if (id) {
        const userData = { ...user, name, username }
        setItemToLocalStorage('loggedTiqueAppUser', JSON.stringify(userData))
        dispatch(setUser(userData))
        showToast({
          ...toastBase,
          title: 'Éxito',
          description: 'Datos de usuario actualizados correctamente',
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo actualizar datos de usuario', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
  }

  return (
    <Flex justify="center">
      <Stack spacing={4} w="full" maxW="md" bg="white" rounded="xl" boxShadow="lg" p={6}>
        <Heading fontSize={{ base: '2xl', sm: '3xl' }}>Mi perfil</Heading>
        <Formik initialValues={{ name: user.name, username: user.username, password: '' }} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <Stack spacing={4}>
                <TextField name="name" label="Nombre" validate={validateRequired} />
                <TextField name="username" label="Usuario" validate={validateRequired} />
                <PasswordField name="password" label="Contraseña" />
                <Button bg="blue.400" color="white" w="full" _hover={{ bg: 'blue.500' }} type="submit">
                  Guardar
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  )
}

Profile.propTypes = {
  user: PropTypes.object
}

export default Profile
