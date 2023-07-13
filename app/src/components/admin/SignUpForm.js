import { Button, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { validateRequired } from '../../utils'
import PasswordField from '../fields/PasswordField'
import TextField from '../fields/TextField'

const SignUpForm = ({ onSubmit }) => (
  <Formik initialValues={{ name: '', username: '', password: '' }} onSubmit={onSubmit}>
    {() => (
      <Form>
        <Stack spacing={4}>
          <TextField name="name" label="Nombres" validate={validateRequired} />
          <TextField name="username" label="Usuario" validate={validateRequired} />
          <PasswordField name="password" label="Contraseña" validate={validateRequired} />
          <Button colorScheme="blue" variant="solid" type="submit">
            Crear cuenta
          </Button>
        </Stack>
      </Form>
    )}
  </Formik>
)

SignUpForm.propTypes = {
  onSubmit: PropTypes.func
}

export default SignUpForm
