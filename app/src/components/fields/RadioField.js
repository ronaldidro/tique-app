import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Field } from 'formik'
import PropTypes from 'prop-types'
import FormField from './FormField'

const RadioField = ({ name, label, options, validate, verticalOrientation = false, ...inputProps }) => (
  <Field name={name} validate={validate}>
    {({ field: { onChange, ...rest }, meta }) => (
      <FormField label={label} meta={meta} {...inputProps}>
        <RadioGroup {...rest}>
          <Stack direction={verticalOrientation ? 'column' : 'row'} justify="space-between">
            {options.map(({ value, label }, index) => (
              <Radio key={index} onChange={onChange} value={value}>
                {label}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </FormField>
    )}
  </Field>
)

RadioField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  validate: PropTypes.func,
  verticalOrientation: PropTypes.bool
}

export default RadioField
