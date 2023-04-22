import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import AppLogo from '../../components/AppLogo'
import PasswordField from '../../components/fields/PasswordField'
import TextField from '../../components/fields/TextField'
import { validateRequired } from '../../utils'

const Login = ({ handleLoginForm }) => (
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

Login.propTypes = {
  handleLoginForm: PropTypes.func
}

export default Login
