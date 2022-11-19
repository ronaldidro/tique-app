import { Field } from 'formik'
import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const TextField = ({ name, label, type = 'text', placeholder, validate, inputAddons, ...inputProps }) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, meta }) => (
        <FormControl isInvalid={meta.touched && meta.error} {...inputProps}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <InputGroup>
            {inputAddons}
            <Input {...field} placeholder={placeholder} type={type} />
          </InputGroup>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

TextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validate: PropTypes.func,
  inputAddons: PropTypes.element
}

export default TextField
