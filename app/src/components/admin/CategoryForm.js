import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { statusOptions, validateRequired } from '../../utils'
import SelectField from '../fields/SelectField'
import TextField from '../fields/TextField'

const CategoryForm = ({ title, initialValues, loadingStatus, handleSubmit, handleCancel }) => (
  <Flex justify="center">
    <Stack spacing={4} w="full" maxW="md" bg="white" rounded="xl" boxShadow="lg" p={6}>
      <Heading fontSize={{ base: '2xl', sm: '3xl' }}>{title}</Heading>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
        {() => (
          <Form>
            <Stack spacing={4}>
              <TextField name="description" label="Descripción" validate={validateRequired} />
              <SelectField name="active" label="Estado" options={statusOptions} />
              <Button
                width="full"
                colorScheme="blue"
                isLoading={loadingStatus}
                loadingText="Guardando"
                spinnerPlacement="end"
                type="submit"
              >
                Guardar
              </Button>
              <Button colorScheme="blue" variant="link" w="full" onClick={handleCancel}>
                Cancelar
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  </Flex>
)

CategoryForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
}

export default CategoryForm
