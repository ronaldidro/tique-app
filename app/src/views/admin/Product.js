import { Button, Flex, Heading, InputLeftAddon, InputRightAddon, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import ArraySelectField from '../../components/fields/ArraySelectField'
import NumberField from '../../components/fields/NumberField'
import SelectField from '../../components/fields/SelectField'
import TextAreaField from '../../components/fields/TextAreaField'
import TextField from '../../components/fields/TextField'
import { useCustomToast, useResource } from '../../hooks'
import { request } from '../../services'
import { getCategoriesOptions, productImageOptions, statusOptions, toastBase, validateRequired } from '../../utils'

const initialConfig = (productId, resources) => {
  if (productId) {
    return {
      title: 'Editar producto',
      initialValues: { ...resources, discount: resources.discount * 100, category: resources.category?.id },
      endpoint: `/products/${productId}`,
      method: 'PATCH',
      finalSentence: 'actualizado correctamente'
    }
  }

  return {
    title: 'Agregar producto',
    initialValues: { name: '', description: '', price: 0.0, discount: 0.0, images: [], active: true },
    endpoint: '/products',
    method: 'POST',
    finalSentence: 'creado correctamente'
  }
}

const productValidationSchema = Yup.object().shape({
  images: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required('Campo obligatorio'),
        url: Yup.string().required('Campo obligatorio')
      })
    )
    .min(1, 'Agregar un tipo y enlace de imagen')
})

const Product = () => {
  const { productId } = useParams()
  const resources = productId ? useResource(`/products/${productId}`) : {}
  const categories = getCategoriesOptions()
  const { title, initialValues, endpoint, method, finalSentence } = initialConfig(productId, resources)
  const navigate = useNavigate()
  const { showToast } = useCustomToast()

  const goToProducts = () => navigate('/admin/productos')

  const handleSubmit = async values => {
    try {
      const response = await request(endpoint, method, { ...values, discount: values.discount / 100 })
      if (response.id) {
        goToProducts()
        showToast({
          ...toastBase,
          title: 'Éxito',
          description: `Producto ${response.name} ${finalSentence}`,
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo realizar la acción', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
  }

  if (productId && !Object.keys(resources).length) return <CircularSpinner />

  return (
    <Flex justify="center">
      <Stack spacing={4} w="full" maxW="md" bg="white" rounded="xl" boxShadow="lg" p={6}>
        <Heading fontSize={{ base: '2xl', sm: '3xl' }}>{title}</Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={productValidationSchema}
          enableReinitialize
        >
          {({ values, handleChange }) => (
            <Form>
              <Stack spacing={4}>
                <TextField name="name" label="Nombre" validate={validateRequired} />
                <TextAreaField name="description" label="Descripción" validate={validateRequired} />
                <Stack direction="row" spacing={4}>
                  <NumberField
                    name="price"
                    label="Precio"
                    defaultValue={values.price}
                    inputLeftItem={<InputLeftAddon>S/</InputLeftAddon>}
                  />
                  <NumberField
                    name="discount"
                    label="Descuento"
                    defaultValue={values.discount}
                    inputRightItem={<InputRightAddon>%</InputRightAddon>}
                  />
                </Stack>
                <SelectField
                  name="category"
                  label="Categoría"
                  options={categories}
                  defaultValue={values.category ? values.category : categories[0]?.value}
                />
                <SelectField name="active" label="Estado" options={statusOptions} />
                <ArraySelectField
                  name="images"
                  label="Imágenes"
                  values={values.images}
                  fields={{ type: '', url: '' }}
                  fieldsPlaceholder={{ url: 'Enlace' }}
                  selectionOptions={productImageOptions}
                  handleSelectChange={handleChange}
                />
                <Button bg="blue.400" color="white" w="full" _hover={{ bg: 'blue.500' }} type="submit">
                  Guardar
                </Button>
                <Button colorScheme="blue" variant="link" w="full" onClick={goToProducts}>
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

export default Product
