import { Button, Flex, Heading, InputLeftAddon, InputRightAddon, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { productImageOptions, statusOptions, validateRequired } from '../../utils'
import ArraySelectField from '../fields/ArraySelectField'
import AttributesField from '../fields/AttributesField'
import NumberField from '../fields/NumberField'
import SelectField from '../fields/SelectField'
import TextAreaField from '../fields/TextAreaField'
import TextField from '../fields/TextField'

const productValidationSchema = Yup.object().shape({
  images: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required('Campo obligatorio'),
        url: Yup.string().required('Campo obligatorio')
      })
    )
    .min(1, 'Agregar un tipo y enlace de imagen'),
  attributes: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required('Campo obligatorio'),
      values: Yup.string().required('Campo obligatorio')
    })
  )
})

const ProductForm = ({ title, initialValues, loadingStatus, categoriesList, handleSubmit, handleCancel }) => (
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
              <SelectField name="category" label="Categoría" options={categoriesList} />
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
              <AttributesField
                name="attributes"
                label="Atributos"
                values={values.attributes}
                fields={{ description: '', values: '', required: true }}
                fieldsPlaceholder={{ description: 'Descripción', values: 'Valores separados por comas' }}
              />
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

ProductForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  categoriesList: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
}

export default ProductForm
