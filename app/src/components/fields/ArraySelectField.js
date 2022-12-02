import { Box, Button, Flex, FormLabel, Text, VStack } from '@chakra-ui/react'
import { Field, FieldArray } from 'formik'
import PropTypes from 'prop-types'
import SelectField from './SelectField'
import TextField from './TextField'

const ErrorMessage = ({ name }) => (
  <Field name={name}>
    {({ meta }) => (
      <Text color="red.500" fontSize="sm">
        {meta.touched && typeof meta.error === 'string' ? meta.error : null}
      </Text>
    )}
  </Field>
)

const ArraySelectField = ({ name, label, values, fields, fieldsPlaceholder, selectionOptions, handleSelectChange }) => (
  <FieldArray
    name={name}
    render={arrayHelpers => (
      <Box>
        <Flex alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor={name} margin={0}>
            {label}
          </FormLabel>
          <Button colorScheme="teal" variant="ghost" onClick={() => arrayHelpers.push(fields)}>
            Agregar
          </Button>
        </Flex>
        {values.map((item, valuesIndex) => (
          <VStack key={valuesIndex} borderWidth={1} borderRadius="lg" borderColor="teal.500" padding={2} marginTop={2}>
            <SelectField
              name={`${name}.${valuesIndex}.${Object.keys(fields)[0]}`}
              defaultValue={item[Object.keys(fields)[0]]}
              options={selectionOptions}
              onChange={handleSelectChange}
            />
            <TextField
              name={`${name}.${valuesIndex}.${Object.keys(fields)[1]}`}
              placeholder={fieldsPlaceholder[Object.keys(fields)[1]]}
            />
            <Box display="flex" justifyContent="center">
              <Button colorScheme="teal" variant="ghost" onClick={() => arrayHelpers.remove(valuesIndex)}>
                Eliminar
              </Button>
            </Box>
          </VStack>
        ))}
        <ErrorMessage name={name} />
      </Box>
    )}
  />
)

ArraySelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
  fields: PropTypes.object,
  fieldsPlaceholder: PropTypes.object,
  selectionOptions: PropTypes.array,
  handleSelectChange: PropTypes.func
}

ErrorMessage.propTypes = {
  name: PropTypes.string
}

export default ArraySelectField
