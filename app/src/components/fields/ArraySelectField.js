import { Box, Button, Flex, FormLabel, Select, VStack } from '@chakra-ui/react'
import { FieldArray } from 'formik'
import PropTypes from 'prop-types'
import TextField from './TextField'

const ArraySelectField = ({
  name,
  label,
  values,
  fields,
  fieldsPlaceholder,
  options,
  validate,
  handleSelectChange
}) => (
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
            <Select
              name={`${name}.${valuesIndex}.${Object.keys(fields)[0]}`}
              defaultValue={item[Object.keys(fields)[0]]}
              onChange={handleSelectChange}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.description}
                </option>
              ))}
            </Select>
            <TextField
              name={`${name}.${valuesIndex}.${Object.keys(fields)[1]}`}
              placeholder={fieldsPlaceholder[Object.keys(fields)[1]]}
              validate={validate}
            />
            <Box display="flex" justifyContent="center">
              <Button colorScheme="teal" variant="ghost" onClick={() => arrayHelpers.remove(valuesIndex)}>
                Eliminar
              </Button>
            </Box>
          </VStack>
        ))}
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
  options: PropTypes.array,
  validate: PropTypes.func,
  handleSelectChange: PropTypes.func
}

export default ArraySelectField
