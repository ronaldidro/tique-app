import { Box, FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from '@chakra-ui/react'
import { Field } from 'formik'
import PropTypes from 'prop-types'

const TextField = ({
  name,
  label,
  type = 'text',
  placeholder,
  validate,
  inputAddons,
  orientation = 'vertical',
  ...inputProps
}) => {
  const isHorizontal = orientation === 'horizontal'

  return (
    <Field name={name} validate={validate}>
      {({ field, meta }) => (
        <FormControl isInvalid={meta.touched && meta.error} {...inputProps}>
          <Box display={isHorizontal && 'flex'} alignItems={isHorizontal && 'center'}>
            {label && (
              <FormLabel htmlFor={name} fontWeight="medium" marginBottom={isHorizontal ? 0 : 2}>
                {label}
              </FormLabel>
            )}
            <InputGroup>
              {inputAddons}
              <Input {...field} placeholder={placeholder} type={type} />
            </InputGroup>
          </Box>
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
  inputAddons: PropTypes.element,
  orientation: PropTypes.oneOf(['vertical', 'horizontal'])
}

export default TextField
