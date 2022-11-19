import { useEffect, useState } from 'react'
import { Button, Flex, Heading, InputLeftAddon, Stack, Textarea, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import TextField from '../../components/fields/TextField'
import services from '../../services'
import { setToastContent, showToast, validateRequired } from '../../utils'
import FormField from '../../components/fields/FormField'

const Shop = ({ shopId }) => {
  const [shopData, setShopData] = useState({
    name: '',
    description: '',
    address: '',
    placeService: '',
    cellPhone: ''
  })
  const toast = useToast()

  const handleSubmit = async values => {
    try {
      const { id } = await services.patch('/companies', { ...values, cellPhone: `+51${values.cellPhone}`, id: shopId })

      if (id) {
        showToast(
          toast,
          setToastContent('Éxito', 'Datos de tienda actualizados correctamente', 'success', 'subtle', 'top')
        )
      } else {
        showToast(toast, setToastContent('Error', 'No se pudo actualizar datos de tienda', 'error', 'subtle', 'top'))
      }
    } catch (error) {
      showToast(toast, setToastContent('Error', error.response.data.error, 'error', 'subtle', 'top'))
    }
  }

  const getShopData = async () => {
    const { name, description, address, placeService, cellPhone } = await services.get(`companies/${shopId}`)
    setShopData({ name, description, address, placeService, cellPhone: cellPhone.slice(3) })
  }

  useEffect(() => {
    getShopData()
  }, [shopId])

  if (Object.values(shopData).every(item => item === '')) return <CircularSpinner />

  return (
    <Flex justify="center">
      <Stack spacing={4} w="full" maxW="md" bg="white" rounded="xl" boxShadow="lg" p={6}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Mi Tienda
        </Heading>
        <Formik initialValues={shopData} onSubmit={handleSubmit} enableReinitialize>
          {() => (
            <Form>
              <Stack spacing={4}>
                <TextField name="name" label="Nombre" validate={validateRequired} />
                <Field name="description" validate={validateRequired}>
                  {({ field, meta }) => (
                    <FormField label="Descripción" meta={meta}>
                      <Textarea resize="none" {...field} />
                    </FormField>
                  )}
                </Field>
                <TextField name="address" label="Dirección" validate={validateRequired} />
                <TextField name="placeService" label="Lugar de servicio" validate={validateRequired} />
                <TextField
                  name="cellPhone"
                  label="Teléfono Móvil"
                  validate={validateRequired}
                  inputAddons={<InputLeftAddon>+51</InputLeftAddon>}
                />
                <Button bg="blue.400" color="white" w="full" _hover={{ bg: 'blue.500' }} type="submit">
                  Guardar
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  )
}

Shop.propTypes = {
  shopId: PropTypes.string
}

export default Shop
