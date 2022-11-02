import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import TextField from '../../components/fields/TextField'
import { CreativeTimLogo } from '../../components/icons/Icons'
import { validateRequired } from '../../utils'

const Login = ({ handleLoginForm }) => (
  <Flex minH="100vh" align="center" justify="center" bg="gray.50">
    <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
      <Stack align="center">
        <Flex alignItems="center">
          <CreativeTimLogo w="32px" h="32px" me="10px" />
          <Heading fontSize="4xl">Tique App</Heading>
        </Flex>
        <Text fontSize="lg" color="gray.600">
          Ingresa tus credenciales para iniciar sesión
        </Text>
      </Stack>
      <Formik initialValues={{ username: '', password: '' }} onSubmit={handleLoginForm}>
        {() => (
          <Form>
            <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
              <Stack spacing={4}>
                <TextField name="username" label="Usuario" validate={validateRequired} />
                <TextField name="password" type="password" label="Contraseña" validate={validateRequired} />
                <Button bg="blue.400" color="white" _hover={{ bg: 'blue.500' }} type="submit">
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
