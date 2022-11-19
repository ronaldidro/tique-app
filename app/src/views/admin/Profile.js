import { Button, Flex, Heading, Stack, useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
import { decodeToken } from 'react-jwt'
import PropTypes from 'prop-types'
import TextField from '../../components/fields/TextField'
import { setUser } from '../../reducers/userReducer'
import services from '../../services'
import { setItemToLocalStorage, setToastContent, showToast, validateRequired } from '../../utils'

const Profile = ({ user }) => {
  const dispatch = useDispatch()
  const toast = useToast()

  const handleSubmit = async values => {
    try {
      const { id: userId } = decodeToken(user.token)
      const { id, name, username } = await services.patch('/users', { ...values, id: userId })
      const userData = { ...user, name, username }

      if (id) {
        setItemToLocalStorage('loggedTiqueAppUser', JSON.stringify(userData))
        dispatch(setUser(userData))
        showToast(
          toast,
          setToastContent('Éxito', 'Datos de usuario actualizados correctamente', 'success', 'subtle', 'top')
        )
      } else {
        showToast(toast, setToastContent('Error', 'No se pudo actualizar datos de usuario', 'error', 'subtle', 'top'))
      }
    } catch (error) {
      showToast(toast, setToastContent('Error', error.response.data.error, 'error', 'subtle', 'top'))
    }
  }

  return (
    <Flex justify="center">
      <Stack spacing={4} w="full" maxW="md" bg="white" rounded="xl" boxShadow="lg" p={6}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Mi Perfil
        </Heading>
        <Formik initialValues={{ name: user.name, username: user.username, password: '' }} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <Stack spacing={4}>
                <TextField name="name" label="Nombre" validate={validateRequired} />
                <TextField name="username" label="Usuario" validate={validateRequired} />
                <TextField name="password" type="password" label="Contraseña" />
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
