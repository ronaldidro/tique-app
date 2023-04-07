import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Divider, HStack, Icon, Text, useToast } from '@chakra-ui/react'
import { FcBusinessman, FcPackage, FcMoneyTransfer, FcOvertime } from 'react-icons/fc'
import { FaWhatsapp } from 'react-icons/fa'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { deleteAllProducts } from '../../reducers/productsOrderReducer'
import {
  getCompanyData,
  getProductsOrder,
  orderModeOptions,
  paymentMethodOptions,
  setToastContent,
  showToast,
  validateRequired
} from '../../utils'
import { sendMessage } from '../../utils/message'
import RadioField from '../fields/RadioField'
import TextField from '../fields/TextField'

const OrderSectionTitle = ({ title, icon }) => {
  return (
    <>
      <HStack paddingBottom={2}>
        {icon}
        <Text fontWeight="bold">{title}</Text>
      </HStack>
      <Divider marginBottom={4} borderColor="gray.500" />
    </>
  )
}

const OrderForm = ({ closeForm }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productsOrder = getProductsOrder()
  const { id, cellPhone } = getCompanyData()
  const toast = useToast()

  const handleSendOrder = values => {
    const orderData = { ...values, products: productsOrder }
    sendMessage(cellPhone, orderData)
    closeForm()
    dispatch(deleteAllProducts())
    showToast(
      toast,
      setToastContent(
        '¡Pedido completado!',
        'Acabamos de enviar tu pedido vía Whatsapp 🙂',
        'success',
        'left-accent',
        'top-right',
        { duration: null, isClosable: true }
      )
    )
    navigate(`/tienda/${id}`)
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        address: '',
        datetime: '',
        orderMode: 'pickup',
        paymentMethod: 'cash'
      }}
      onSubmit={handleSendOrder}
    >
      {() => (
        <Form>
          <OrderSectionTitle title="Contacto" icon={<Icon as={FcBusinessman} />} />
          <HStack paddingBottom={4}>
            <TextField name="firstName" label="Nombres" validate={validateRequired} />
            <TextField name="lastName" label="Apellidos" validate={validateRequired} />
          </HStack>
          <TextField name="address" label="Dirección" validate={validateRequired} paddingBottom={7} />

          <OrderSectionTitle title="Modo de pedido" icon={<Icon as={FcPackage} />} />
          <RadioField name="orderMode" validate={validateRequired} options={orderModeOptions} paddingBottom={7} />

          <OrderSectionTitle title="Fecha y hora del pedido" icon={<Icon as={FcOvertime} />} />
          <TextField name="datetime" type="datetime-local" validate={validateRequired} paddingBottom={7} />

          <OrderSectionTitle title="Método de pago" icon={<Icon as={FcMoneyTransfer} />} />
          <RadioField
            name="paymentMethod"
            validate={validateRequired}
            options={paymentMethodOptions}
            paddingBottom={7}
          />

          <Button rightIcon={<Icon as={FaWhatsapp} />} width="full" colorScheme="whatsapp" type="submit">
            Enviar Pedido
          </Button>
          <Text display="flex" justifyContent="center" paddingTop={4} as="cite">
            Tu pedido será enviado a través de Whatsapp
          </Text>
        </Form>
      )}
    </Formik>
  )
}

OrderForm.propTypes = {
  closeForm: PropTypes.func
}

OrderSectionTitle.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element
}

export default OrderForm
