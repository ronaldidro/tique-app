import { Button, Flex, FormLabel, VStack } from '@chakra-ui/react'
import { FieldArray } from 'formik'
import PropTypes from 'prop-types'
import ErrorField from './ErrorField'
import TextAreaField from './TextAreaField'
import TextField from './TextField'

const AttributesField = ({ name, label, values, fields, fieldsPlaceholder }) => (
  <FieldArray
    name={name}
    render={arrayHelpers => (
      <>
        <Flex alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor={name} margin={0} fontWeight="medium">
            {label}
          </FormLabel>
          <Button colorScheme="blue" variant="ghost" onClick={() => arrayHelpers.push(fields)}>
            Agregar
          </Button>
        </Flex>
        {values.map((item, indexValue) => (
          <VStack key={indexValue} borderWidth={1} borderRadius="lg" borderColor="blue.500" padding={2} marginTop={2}>
            <TextField
              name={`${name}.${indexValue}.${Object.keys(fields)[0]}`}
              placeholder={fieldsPlaceholder[Object.keys(fields)[0]]}
            />
            <TextAreaField
              name={`${name}.${indexValue}.${Object.keys(fields)[1]}`}
              placeholder={fieldsPlaceholder[Object.keys(fields)[1]]}
            />
            <Button colorScheme="blue" variant="ghost" onClick={() => arrayHelpers.remove(indexValue)}>
              Eliminar
            </Button>
          </VStack>
        ))}
        <ErrorField name={name} />
      </>
    )}
  />
)

AttributesField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
  fields: PropTypes.object,
  fieldsPlaceholder: PropTypes.object
}

export default AttributesField
