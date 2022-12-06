import { Box, Button, Flex, FormLabel, Icon, Stack } from '@chakra-ui/react'
import { FieldArray } from 'formik'
import { MdDeleteForever } from 'react-icons/md'
import PropTypes from 'prop-types'
import ErrorField from './ErrorField'
import TextField from './TextField'

const ArrayField = ({ name, label, values, fields, fieldsPlaceholder }) => (
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
          <Stack
            key={valuesIndex}
            alignItems="center"
            direction={['column', 'row']}
            marginTop={2}
            padding={[2, 0]}
            borderWidth={[1, 0]}
            borderRadius={['lg', 'none']}
            borderColor={['teal.500', 'transparent']}
          >
            {Object.keys(fields).map((field, index) => (
              <TextField key={index} name={`${name}.${valuesIndex}.${field}`} placeholder={fieldsPlaceholder[field]} />
            ))}
            <Icon
              as={MdDeleteForever}
              display={{ base: 'none', md: 'inline-flex' }}
              color="red"
              cursor="pointer"
              boxSize={7}
              onClick={() => arrayHelpers.remove(valuesIndex)}
            />
            <Button
              display={{ base: 'block', md: 'none' }}
              colorScheme="teal"
              variant="ghost"
              onClick={() => arrayHelpers.remove(valuesIndex)}
            >
              Eliminar
            </Button>
          </Stack>
        ))}
        <ErrorField name={name} />
      </Box>
    )}
  />
)

ArrayField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
  fields: PropTypes.object,
  fieldsPlaceholder: PropTypes.object
}

export default ArrayField
