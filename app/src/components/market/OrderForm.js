import { Alert, AlertIcon, Button, Divider, HStack, Icon, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FcBusinessman, FcMoneyTransfer, FcOvertime, FcPackage, FcSearch } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCustomToast } from '../../hooks'
import { deleteAllProducts } from '../../reducers/productsOrderReducer'
import { request } from '../../services'
import {
  getOrderTotalItems,
  getOrderTotalPrice,
  getProductsOrder,
  getShopData,
  orderModeOptions,
  payMethodOptions,
  validateRequired
} from '../../utils'
import { sendMessage } from '../../utils/message'
import RadioField from '../fields/RadioField'
import TextField from '../fields/TextField'

const formConfigValues = {
  initialValues: {
    documentNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    deadline: '',
    orderMode: 'pickup',
    payMethod: 'cash'
  },
  showContactInputs: false,
  customerFound: false
}

const OrderSection = ({ title, icon, children }) => {
  return (
    <>
      <HStack paddingBottom={2}>
        {icon}
        <Text fontWeight="bold">{title}</Text>
      </HStack>
      <Divider marginBottom={4} borderColor="gray.500" />
      {children}
    </>
  )
}

const OrderForm = ({ closeForm }) => {
  const [formConfig, setFormConfig] = useState(formConfigValues)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { showToast } = useCustomToast()
  const productsOrder = getProductsOrder()
  const { id, cellPhone } = getShopData()
  const totalItems = getOrderTotalItems()
  const totalPrice = getOrderTotalPrice()

  const saveOrder = async orderData => {
    const detail = productsOrder.map(
      ({ id: product, price, discount, discountedPrice, quantity, totalPrice: amount }) => ({
        product,
        price,
        discount,
        discountedPrice,
        quantity,
        amount
      })
    )

    const newOrder = {
      ...orderData,
      mode: orderData.orderMode,
      products: productsOrder,
      items: totalItems,
      total: totalPrice,
      shop: id,
      detail
    }

    try {
      const response = await request('/orders', 'POST', newOrder)
      if (response.id) console.info('Order saved!')
    } catch (error) {
      console.error('Error: ', error.response.data.error)
    }
  }

  const handleSendOrder = values => {
    const orderData = { ...values, products: productsOrder, totalPrice }

    saveOrder(orderData)
    sendMessage(cellPhone, orderData)
    dispatch(deleteAllProducts())
    closeForm()
    navigate(`/tienda/${id}`)
    showToast({
      title: '¡Pedido completado!',
      description: 'Acabamos de enviar tu pedido vía WhatsApp 🙂',
      status: 'success',
      position: 'top',
      variant: 'left-accent',
      duration: null,
      isClosable: true
    })
  }

  const handleSearchButton = async documentNumber => {
    const response = await request(`/customers?documentNumber=${documentNumber}`)

    if (response.length) {
      const { firstName, lastName, address } = response[0]
      setFormConfig({
        initialValues: { ...formConfig.initialValues, documentNumber, firstName, lastName, address },
        showContactInputs: true,
        customerFound: true
      })
    } else {
      setFormConfig({
        initialValues: { ...formConfig.initialValues, documentNumber, firstName: '', lastName: '', address: '' },
        showContactInputs: true,
        customerFound: false
      })
    }
  }

  return (
    <Formik initialValues={formConfig.initialValues} onSubmit={handleSendOrder} enableReinitialize>
      {({ values }) => (
        <Form>
          <OrderSection title="Contacto" icon={<Icon as={FcBusinessman} />}>
            <HStack paddingBottom={4}>
              <TextField
                name="documentNumber"
                label="DNI"
                orientation="horizontal"
                validate={value => {
                  if (value.trim() === '') return 'Campo requerido'
                  if (value.trim().length !== 8) return 'DNI inválido'
                }}
                maxWidth={40}
              />
              <Button
                leftIcon={<Icon as={FcSearch} />}
                colorScheme="linkedin"
                type="button"
                onClick={() => handleSearchButton(values.documentNumber)}
              >
                Buscar
              </Button>
            </HStack>
            {formConfig.showContactInputs && (
              <Alert status={formConfig.customerFound ? 'success' : 'error'} variant="left-accent" marginBottom={4}>
                <AlertIcon />
                {formConfig.customerFound
                  ? `Cliente encontrado. Hola, ${values.firstName}!`
                  : 'No se encontró cliente, ingresa tus datos'}
              </Alert>
            )}
            {formConfig.showContactInputs && (
              <>
                <HStack paddingBottom={4}>
                  <TextField name="firstName" label="Nombres" validate={validateRequired} />
                  <TextField name="lastName" label="Apellidos" validate={validateRequired} />
                </HStack>
                <TextField name="address" label="Dirección" validate={validateRequired} paddingBottom={7} />
              </>
            )}
          </OrderSection>
          <OrderSection title="Modo de pedido" icon={<Icon as={FcPackage} />}>
            <RadioField name="orderMode" validate={validateRequired} options={orderModeOptions} paddingBottom={7} />
          </OrderSection>
          <OrderSection title="Fecha y hora de entrega" icon={<Icon as={FcOvertime} />}>
            <TextField
              name="deadline"
              type="datetime-local"
              validate={value => {
                if (value.trim() === '') return 'Campo requerido'
                if (Date.parse(value) < Date.now()) return 'Fecha no debe ser menor a la actual'
              }}
              paddingBottom={7}
            />
          </OrderSection>
          <OrderSection title="Método de pago" icon={<Icon as={FcMoneyTransfer} />}>
            <RadioField name="payMethod" validate={validateRequired} options={payMethodOptions} paddingBottom={7} />
          </OrderSection>
          <Button rightIcon={<Icon as={FaWhatsapp} />} width="full" colorScheme="whatsapp" type="submit">
            Enviar pedido
          </Button>
          <Text fontSize={['sm', 'md']} textAlign="center" fontWeight="semibold" paddingTop={4}>
            Tu pedido será enviado a través de WhatsApp
          </Text>
        </Form>
      )}
    </Formik>
  )
}

OrderForm.propTypes = {
  closeForm: PropTypes.func
}

OrderSection.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.node
}

export default OrderForm
