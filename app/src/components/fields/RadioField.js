import { Field } from 'formik'
import { FormControl, FormErrorMessage, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const RadioField = ({ name, validate, options, ...inputProps }) => {
  return (
    <Field name={name} validate={validate}>
      {({ field: { onChange, ...rest }, meta }) => (
        <FormControl as="fieldset" isInvalid={meta.touched && meta.error} {...inputProps}>
          <RadioGroup {...rest}>
            <HStack>
              {options.map(({ value, label }, index) => (
                <Radio key={index} onChange={onChange} value={value}>
                  {label}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

RadioField.propTypes = {
  name: PropTypes.string,
  validate: PropTypes.func,
  options: PropTypes.array
}

export default RadioField
