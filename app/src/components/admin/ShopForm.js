import { Button, InputLeftAddon, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { shopImageOptions, socialNetworksOptions, validateRequired } from '../../utils'
import ArrayField from '../fields/ArrayField'
import ArraySelectField from '../fields/ArraySelectField'
import TextAreaField from '../fields/TextAreaField'
import TextField from '../fields/TextField'

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

const ShopForm = ({ initialValues, handleSubmit, isLoadingButton }) => (
  <Formik
    initialValues={initialValues}
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
            showArrayOptions={false}
            disabledSelect
          />
          <Button
            width="full"
            colorScheme="blue"
            isLoading={isLoadingButton}
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
)

ShopForm.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  isLoadingButton: PropTypes.bool
}

export default ShopForm
