import { useState } from 'react'
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Field } from 'formik'
import PropTypes from 'prop-types'
import FormField from './FormField'

const PasswordField = ({ name, label, validate }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field name={name} validate={validate}>
      {({ field, meta }) => (
        <FormField label={label} meta={meta}>
          <InputGroup>
            <Input {...field} type={showPassword ? 'text' : 'password'} />
            <InputRightElement>
              <IconButton
                variant="ghost"
                icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                onClick={() => setShowPassword(showPassword => !showPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormField>
      )}
    </Field>
  )
}

PasswordField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  validate: PropTypes.func
}

export default PasswordField
