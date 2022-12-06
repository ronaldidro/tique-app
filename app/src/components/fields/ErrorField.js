import { Text } from '@chakra-ui/react'
import { Field } from 'formik'
import PropTypes from 'prop-types'

const ErrorField = ({ name }) => (
  <Field name={name}>
    {({ meta }) => (
      <Text color="red.500" fontSize="sm">
        {meta.touched && typeof meta.error === 'string' ? meta.error : null}
      </Text>
    )}
  </Field>
)

ErrorField.propTypes = {
  name: PropTypes.string
}

export default ErrorField
