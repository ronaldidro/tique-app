import { Button, Flex, Heading, Stack, useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import SelectField from '../../components/fields/SelectField'
import TextField from '../../components/fields/TextField'
import { useResource } from '../../hooks'
import { request } from '../../services'
import { setToastContent, showToast, statusOptions, validateRequired } from '../../utils'

const initialConfig = (categoryId, resources) => {
  if (categoryId)
    return {
      title: 'Editar categoría',
      initialValues: { description: resources.description, active: resources.active },
      endpoint: `/categories/${categoryId}`,
      method: 'PATCH',
      finalSentence: 'actualizada correctamente'
    }

  return {
    title: 'Agregar categoría',
    initialValues: { description: '', active: true },
    endpoint: '/categories',
    method: 'POST',
    finalSentence: 'creada correctamente'
  }
}

const Category = () => {
  const { categoryId } = useParams()
  const resources = categoryId ? useResource(`/categories/${categoryId}`) : {}
  const { title, initialValues, endpoint, method, finalSentence } = initialConfig(categoryId, resources)
  const navigate = useNavigate()
  const toast = useToast()

  const goToCategories = () => navigate('/admin/categorias')

  const handleSubmit = async values => {
    try {
      const response = await request(endpoint, method, values)

      if (response.id) {
        showToast(
          toast,
          setToastContent('Éxito', `Categoría ${response.description} ${finalSentence}`, 'success', 'subtle', 'top')
        )
        goToCategories()
      } else {
        showToast(toast, setToastContent('Error', 'No se pudo realizar la acción', 'error', 'subtle', 'top'))
      }
    } catch (error) {
      showToast(toast, setToastContent('Error', error.response.data.error, 'error', 'subtle', 'top'))
    }
  }

  if (categoryId && !Object.keys(resources).length) return <CircularSpinner />

  return (
    <Flex justify="center">
      <Stack spacing={4} w="full" maxW="md" bg="white" rounded="xl" boxShadow="lg" p={6}>
        <Heading fontSize={{ base: '2xl', sm: '3xl' }}>{title}</Heading>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
          {() => (
            <Form>
              <Stack spacing={4}>
                <TextField name="description" label="Descripción" validate={validateRequired} />
                <SelectField name="active" label="Estado" options={statusOptions} validate={validateRequired} />
                <Button bg="blue.400" color="white" w="full" _hover={{ bg: 'blue.500' }} type="submit">
                  Guardar
                </Button>
                <Button colorScheme="blue" variant="link" w="full" onClick={goToCategories}>
                  Cancelar
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  )
}

export default Category
