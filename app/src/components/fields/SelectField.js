import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react'
import { Field } from 'formik'
import PropTypes from 'prop-types'

const SelectField = ({ name, label, options, validate }) => (
  <Field name={name} validate={validate}>
    {({ field, meta }) => (
      <FormControl isInvalid={meta.touched && meta.error}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Select {...field}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.description}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
)

SelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  validate: PropTypes.func
}

export default SelectField
