import { Heading, VStack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { orderModeOptions, payMethodOptions, validateRequired } from '../../utils'
import RadioField from '../fields/RadioField'
import TextField from '../fields/TextField'

const SectionTitle = ({ title, ...props }) => (
  <Heading fontSize="xl" fontWeight="bold" {...props}>
    {title}
  </Heading>
)

const OrderCheckoutForm = ({ formValues }) => (
  <>
    <SectionTitle title="Información de envío" />
    <VStack spacing={8} marginTop={[6, 10]}>
      <TextField
        name="documentNumber"
        label="DNI"
        validate={value => {
          if (value.trim() === '') return 'Campo requerido'
          if (value.trim().length !== 8) return 'DNI inválido'
        }}
      />
      <TextField name="firstName" label="Nombres" validate={validateRequired} />
      <TextField name="lastName" label="Apellidos" validate={validateRequired} />
      <TextField
        name="address"
        label="Dirección"
        validate={value => {
          if (formValues.orderMode === 'delivery' && value.trim() === '') return 'Campo requerido'
        }}
      />
    </VStack>

    <SectionTitle title="Modo de pedido" marginTop={[16, 20]} marginBottom={[6, 10]} />
    <RadioField name="orderMode" validate={validateRequired} options={orderModeOptions} />

    <SectionTitle title="Fecha y hora de entrega" marginTop={[16, 20]} marginBottom={[6, 10]} />
    <TextField
      name="deadline"
      type="datetime-local"
      validate={value => {
        if (value.trim() === '') return 'Campo requerido'
        if (Date.parse(value) < Date.now()) return 'Fecha no debe ser menor a la actual'
      }}
    />

    <SectionTitle title="Método de pago" marginTop={[16, 20]} marginBottom={[6, 10]} />
    <RadioField name="payMethod" validate={validateRequired} options={payMethodOptions} />
  </>
)

SectionTitle.propTypes = {
  title: PropTypes.string
}

OrderCheckoutForm.propTypes = {
  formValues: PropTypes.object
}

export default OrderCheckoutForm
