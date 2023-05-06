import { Select } from '@chakra-ui/react'
import { Field } from 'formik'
import PropTypes from 'prop-types'
import FormField from './FormField'

const SelectField = ({ name, label, options, validate, ...props }) => (
  <Field name={name} validate={validate}>
    {({ field, meta }) => (
      <FormField label={label} meta={meta}>
        <Select {...field} {...props}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.description}
            </option>
          ))}
        </Select>
      </FormField>
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
