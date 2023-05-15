import { Box, Container, Flex, HStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { TbShoppingCartX } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LinkButton from '../../components/fields/LinkButton'
import CenteredIcon from '../../components/market/CenteredIcon'
import OrderCheckoutForm from '../../components/market/OrderCheckoutForm'
import OrderCheckoutSummary from '../../components/market/OrderCheckoutSummary'
import { useCustomToast, useResponsive } from '../../hooks'
import { deleteAllProducts, updateProduct } from '../../reducers/productsOrderReducer'
import { request } from '../../services'
import { getOrderTotalItems, getOrderTotalPrice, getProductsOrder, getShopData } from '../../utils'
import { sendMessage } from '../../utils/message'

const initialValues = {
  documentNumber: '',
  firstName: '',
  lastName: '',
  address: '',
  deadline: '',
  orderMode: 'pickup',
  payMethod: 'cash'
}

const saveOrder = async (shopId, orderData) => {
  const detail = orderData.products.map(
    ({
      id: product,
      chosenAttributes: attributes,
      price,
      discount,
      discountedPrice,
      quantity,
      totalPrice: amount
    }) => ({
      product,
      attributes,
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
    products: orderData.products,
    items: orderData.totalItems,
    total: orderData.totalPrice,
    shop: shopId,
    detail
  }

  try {
    const response = await request('/orders', 'POST', newOrder)
    if (response.id) console.info('Order saved!')
  } catch (error) {
    console.error('Error: ', error.response.data.error)
  }
}

const OrderCheckout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isDesktop } = useResponsive()
  const { showToast } = useCustomToast()
  const orderProducts = getProductsOrder()
  const orderTotalItems = getOrderTotalItems()
  const orderTotalPrice = getOrderTotalPrice()
  const shop = getShopData()
  const orderProductsExists = orderProducts.length > 0

  const updateOrderProduct = (quantity, product) => {
    const totalPriceUpdated = product.discountedPrice * quantity
    const productUpdated = { ...product, quantity, totalPrice: totalPriceUpdated }
    dispatch(updateProduct(productUpdated))
  }

  const handleSendOrder = values => {
    const sendMode = isDesktop ? 'web' : 'api'
    const orderData = { ...values, products: orderProducts, totalItems: orderTotalItems, totalPrice: orderTotalPrice }

    saveOrder(shop.id, orderData)
    sendMessage(shop.cellPhone, orderData, sendMode)
    dispatch(deleteAllProducts())
    navigate(`/tienda/${shop.id}`)
    showToast({
      title: '¡Pedido completado!',
      description: 'Acabamos de enviar tu pedido vía WhatsApp 🙂',
      status: 'success',
      position: isDesktop ? 'top' : 'top-right',
      variant: 'left-accent',
      duration: null,
      isClosable: true
    })
  }

  return (
    <Box paddingY={orderProductsExists ? 0 : 5} backgroundColor={orderProductsExists ? 'white' : 'gray.50'}>
      <Container maxW="5xl">
        {!orderProductsExists ? (
          <CenteredIcon
            icon={TbShoppingCartX}
            description="El carrito está vacío"
            handleReturnButton={() => navigate(-1)}
          />
        ) : (
          <Formik initialValues={initialValues} onSubmit={handleSendOrder}>
            {({ values }) => (
              <Form>
                <Flex direction={{ base: 'column', md: 'row' }}>
                  <Box paddingRight={[0, 12]} paddingY={[6, 12]} width={['100%', '55%']}>
                    <OrderCheckoutForm formValues={values} />
                  </Box>
                  <Box
                    paddingX={[0, 12]}
                    paddingY={[6, 12]}
                    backgroundColor={['white', 'gray.50']}
                    width={['100%', '45%']}
                  >
                    <OrderCheckoutSummary
                      products={orderProducts}
                      totalItems={orderTotalItems}
                      totalPrice={orderTotalPrice}
                      onChangeQuantity={updateOrderProduct}
                    />
                    <HStack mt="6" justify="center" fontWeight="semibold">
                      <p>o</p>
                      <LinkButton pathname="/carrito" color="blue.500">
                        Volver al carrito
                      </LinkButton>
                    </HStack>
                  </Box>
                </Flex>
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </Box>
  )
}

export default OrderCheckout
