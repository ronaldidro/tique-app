import { Textarea } from '@chakra-ui/react'
import { Field } from 'formik'
import PropTypes from 'prop-types'
import FormField from './FormField'

const TextAreaField = ({ name, label, placeholder, validate }) => (
  <Field name={name} validate={validate}>
    {({ field, meta }) => (
      <FormField label={label} meta={meta}>
        <Textarea {...field} placeholder={placeholder} />
      </FormField>
    )}
  </Field>
)

TextAreaField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  validate: PropTypes.func
}

export default TextAreaField
