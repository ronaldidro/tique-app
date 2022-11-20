import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Flex, Heading, Image, InputLeftAddon, Stack, Textarea, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import ArrayField from '../../components/fields/ArrayField'
import ArraySelectField from '../../components/fields/ArraySelectField'
import FormField from '../../components/fields/FormField'
import TextField from '../../components/fields/TextField'
import { request } from '../../services'
import { setToastContent, shopImageOptions, showToast, socialNetworksOptions, validateRequired } from '../../utils'

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
      const response = await request(`/companies/${shopId}`, 'PATCH', {
        ...values,
        cellPhone: `+51${values.cellPhone}`
      })

      if (response.id) {
        setShopData({ ...shopData, images: response.images })
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
    const { name, description, address, placeService, attentionSchedule, socialNetworks, images, cellPhone } =
      await request(`companies/${shopId}`, 'GET')

    setShopData({
      name,
      description,
      address,
      placeService,
      attentionSchedule,
      socialNetworks,
      images,
      cellPhone: cellPhone.slice(3)
    })
  }

  const getPictureUrl = type => shopData.images.find(item => item.type === type).url

  useEffect(() => {
    getShopData()
  }, [shopId])

  if (Object.values(shopData).every(item => item === '')) return <CircularSpinner />

  return (
    <Flex justify="center">
      <Box w="full" maxW="md" bg="white" rounded="xl" boxShadow="lg" overflow="hidden">
        <Image height="150px" w="full" src={getPictureUrl('headboard')} objectFit="cover" />
        <Flex justify="center" marginTop={-12}>
          <Avatar size="2xl" src={getPictureUrl('profile')} alt="Shop" borderWidth="initial" borderColor="white" />
        </Flex>
        <Stack spacing={4} padding={6}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Mi Tienda
          </Heading>
          <Formik initialValues={shopData} onSubmit={handleSubmit} enableReinitialize>
            {({ values, handleChange }) => (
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
                  <ArrayField
                    name="attentionSchedule"
                    label="Horarios de atención"
                    values={values.attentionSchedule}
                    fields={{ day: '', schedule: '' }}
                    fieldsPlaceholder={{ day: 'Día(s)', schedule: 'Horario' }}
                    validate={validateRequired}
                  />
                  <ArraySelectField
                    name="socialNetworks"
                    label="Redes sociales"
                    values={values.socialNetworks}
                    fields={{ type: '', url: '' }}
                    fieldsPlaceholder={{ url: 'Enlace' }}
                    options={socialNetworksOptions}
                    validate={validateRequired}
                    handleSelectChange={handleChange}
                  />
                  <ArraySelectField
                    name="images"
                    label="Imágenes"
                    values={values.images}
                    fields={{ type: '', url: '' }}
                    fieldsPlaceholder={{ url: 'Enlace' }}
                    options={shopImageOptions}
                    validate={validateRequired}
                    handleSelectChange={handleChange}
                  />
                  <Button bg="blue.400" color="white" w="full" _hover={{ bg: 'blue.500' }} type="submit">
                    Guardar
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Box>
    </Flex>
  )
}

Shop.propTypes = {
  shopId: PropTypes.string
}

export default Shop
