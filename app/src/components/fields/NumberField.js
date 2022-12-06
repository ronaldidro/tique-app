import { Field } from 'formik'
import {
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FormField from './FormField'

const NumberField = ({
  name,
  label,
  defaultValue,
  precision = 2,
  step = 0.1,
  validate,
  inputLeftItem,
  inputRightItem,
  showStepper = false
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, meta }) => (
        <FormField label={label} meta={meta}>
          <InputGroup>
            {inputLeftItem}
            <NumberInput defaultValue={defaultValue} precision={precision} step={step}>
              <NumberInputField
                {...field}
                type="number"
                borderLeftRadius={inputLeftItem && 0}
                borderRightRadius={inputRightItem && 0}
              />
              {showStepper && (
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              )}
            </NumberInput>
            {inputRightItem}
          </InputGroup>
        </FormField>
      )}
    </Field>
  )
}

NumberField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.number,
  precision: PropTypes.number,
  step: PropTypes.number,
  validate: PropTypes.func,
  inputLeftItem: PropTypes.element,
  inputRightItem: PropTypes.element,
  showStepper: PropTypes.bool
}

export default NumberField
