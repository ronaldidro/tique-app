import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const FormField = ({ label, meta, children, ...inputProps }) => (
  <FormControl isInvalid={meta.touched && meta.error} {...inputProps}>
    <FormLabel fontWeight="semibold">{label}</FormLabel>
    {children}
    <FormErrorMessage>{meta.error}</FormErrorMessage>
  </FormControl>
)

FormField.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.element
}

export default FormField
