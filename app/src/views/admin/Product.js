import { Button, Flex, Heading, InputLeftAddon, InputRightAddon, Stack, useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import ArraySelectField from '../../components/fields/ArraySelectField'
import NumberField from '../../components/fields/NumberField'
import SelectField from '../../components/fields/SelectField'
import TextAreaField from '../../components/fields/TextAreaField'
import TextField from '../../components/fields/TextField'
import { useResource } from '../../hooks'
import { request } from '../../services'
import {
  getCategoriesOptions,
  productImageOptions,
  setToastContent,
  showToast,
  statusOptions,
  validateRequired
} from '../../utils'

const initialConfig = (productId, resources) => {
  if (productId) {
    const { name, description, price, discount, images, active } = resources
    return {
      title: 'Editar producto',
      initialValues: {
        name,
        description,
        price,
        discount: discount * 100,
        images,
        active,
        category: resources.category?.id
      },
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
  const toast = useToast()

  const goToProducts = () => navigate('/admin/productos')

  const handleSubmit = async values => {
    try {
      const response = await request(endpoint, method, { ...values, discount: values.discount / 100 })
      if (response.id) {
        showToast(
          toast,
          setToastContent('Éxito', `Producto ${response.name} ${finalSentence}`, 'success', 'subtle', 'top')
        )
        goToProducts()
      } else {
        showToast(toast, setToastContent('Error', 'No se pudo realizar la acción', 'error', 'subtle', 'top'))
      }
    } catch (error) {
      showToast(toast, setToastContent('Error', error.response.data.error, 'error', 'subtle', 'top'))
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
                    validate={validateRequired}
                    inputLeftItem={<InputLeftAddon>S/</InputLeftAddon>}
                  />
                  <NumberField
                    name="discount"
                    label="Descuento"
                    defaultValue={values.discount}
                    validate={validateRequired}
                    inputRightItem={<InputRightAddon>%</InputRightAddon>}
                  />
                </Stack>
                <SelectField
                  name="category"
                  label="Categoría"
                  options={categories}
                  defaultValue={values.category ? values.category : categories[0]?.value}
                  validate={validateRequired}
                />
                <SelectField name="active" label="Estado" options={statusOptions} validate={validateRequired} />
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
