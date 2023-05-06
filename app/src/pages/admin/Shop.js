import { Avatar, Box, Button, Flex, Image, InputLeftAddon, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import ArrayField from '../../components/fields/ArrayField'
import ArraySelectField from '../../components/fields/ArraySelectField'
import TextAreaField from '../../components/fields/TextAreaField'
import TextField from '../../components/fields/TextField'
import { useCustomToast } from '../../hooks'
import { useGetShopQuery, usePatchShopMutation } from '../../services/shops'
import { getImageTypeUrl, shopImageOptions, socialNetworksOptions, toastBase, validateRequired } from '../../utils'

const shopValidationSchema = Yup.object().shape({
  attentionSchedule: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required('Campo obligatorio'),
        schedule: Yup.string().required('Campo obligatorio')
      })
    )
    .min(1, 'Agregar un día y horario de atención'),
  socialNetworks: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required('Campo obligatorio'),
        url: Yup.string().required('Campo obligatorio')
      })
    )
    .min(1, 'Agregar un tipo y enlace de red social'),
  images: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required('Campo obligatorio'),
        url: Yup.string().required('Campo obligatorio')
      })
    )
    .min(1, 'Agregar un tipo y enlace de imagen')
})

const Shop = ({ shopId }) => {
  const { data: shop, isLoading } = useGetShopQuery(shopId)
  const [patchShop, { isLoading: isUpdating }] = usePatchShopMutation()
  const { showToast } = useCustomToast()
  const shopImagesUrl = shop ? ['headboard', 'profile'].map(type => getImageTypeUrl(shop.images, type)) : []

  if (isLoading) return <CircularSpinner />

  const handleSubmit = async ({
    name,
    description,
    address,
    placeService,
    cellPhone,
    attentionSchedule,
    socialNetworks,
    images
  }) => {
    try {
      const response = await patchShop({
        id: shopId,
        name,
        description,
        address,
        placeService,
        cellPhone: `+51${cellPhone}`,
        attentionSchedule,
        socialNetworks,
        images
      })

      if (response.data.id) {
        showToast({
          ...toastBase,
          title: 'Éxito',
          description: 'Datos de tienda actualizados correctamente',
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo actualizar datos de tienda', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
  }

  return (
    <Flex justify="center">
      <Box w="full" maxW="md" bg="white" rounded="xl" boxShadow="lg" overflow="hidden">
        <Image src={shopImagesUrl[0]} height="150px" w="full" objectFit="cover" />
        <Flex justify="center" marginTop={-12}>
          <Avatar src={shopImagesUrl[1]} size="2xl" alt="Shop" borderWidth="initial" borderColor="white" />
        </Flex>
        <Formik
          initialValues={{ ...shop, cellPhone: shop.cellPhone.slice(3) }}
          onSubmit={handleSubmit}
          validationSchema={shopValidationSchema}
          enableReinitialize
        >
          {({ values, handleChange }) => (
            <Form>
              <Stack spacing={4} padding={6}>
                <TextField name="name" label="Nombre" validate={validateRequired} />
                <TextAreaField name="description" label="Descripción" validate={validateRequired} />
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
                />
                <ArraySelectField
                  name="socialNetworks"
                  label="Redes sociales"
                  values={values.socialNetworks}
                  fields={{ type: '', url: '' }}
                  fieldsPlaceholder={{ url: 'Enlace' }}
                  selectionOptions={socialNetworksOptions}
                  handleSelectChange={handleChange}
                />
                <ArraySelectField
                  name="images"
                  label="Imágenes"
                  values={values.images}
                  fields={{ type: '', url: '' }}
                  fieldsPlaceholder={{ url: 'Enlace' }}
                  selectionOptions={shopImageOptions}
                  handleSelectChange={handleChange}
                />
                <Button
                  width="full"
                  colorScheme="blue"
                  isLoading={isUpdating}
                  loadingText="Guardando"
                  spinnerPlacement="end"
                  type="submit"
                >
                  Guardar
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

Shop.propTypes = {
  shopId: PropTypes.string
}

export default Shop
