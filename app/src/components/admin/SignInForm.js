import { Button, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { validateRequired } from '../../utils'
import PasswordField from '../fields/PasswordField'
import TextField from '../fields/TextField'

const SignInForm = ({ onSubmit }) => (
  <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit}>
    {({ isSubmitting }) => (
      <Form>
        <Stack spacing={4}>
          <TextField name="username" label="Usuario" validate={validateRequired} />
          <PasswordField name="password" label="Contraseña" validate={validateRequired} />
          <Button
            colorScheme="blue"
            variant="solid"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Autenticando"
            spinnerPlacement="end"
          >
            Iniciar sesión
          </Button>
        </Stack>
      </Form>
    )}
  </Formik>
)

SignInForm.propTypes = {
  onSubmit: PropTypes.func
}

export default SignInForm
