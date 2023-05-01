import { Box, Container, Flex, HStack, Heading, Stack } from '@chakra-ui/react'
import { useRef } from 'react'
import { TbShoppingCartX } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LinkButton from '../../components/fields/LinkButton'
import CartItem from '../../components/market/CartItem'
import CartOrderSummary from '../../components/market/CartOrderSummary'
import CenteredIcon from '../../components/market/CenteredIcon'
import { deleteProduct, updateProduct } from '../../reducers/productsOrderReducer'
import { getOrderTotalItems, getOrderTotalPrice, getProductsOrder, getShopData } from '../../utils'

const ShopCart = () => {
  const orderProducts = getProductsOrder()
  const orderTotalPrice = getOrderTotalPrice()
  const orderTotalItems = getOrderTotalItems()
  const shop = getShopData()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alertDialogRef = useRef()

  const updateOrderProduct = (quantity, product) => {
    const totalPriceUpdated = product.discountedPrice * quantity
    const productUpdated = { ...product, quantity, totalPrice: totalPriceUpdated }
    dispatch(updateProduct(productUpdated))
  }

  const deleteOrderProduct = product => {
    dispatch(deleteProduct(product))
    alertDialogRef.current.closeAlert()
  }

  return (
    <Box paddingY={5} backgroundColor="gray.50">
      <Container maxW="5xl">
        {!orderProducts.length ? (
          <CenteredIcon
            icon={TbShoppingCartX}
            description="El carrito está vacío"
            handleReturnButton={() => navigate(-1)}
          />
        ) : (
          <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }} spacing={{ base: 8, md: 16 }}>
            <Stack spacing={{ base: 8, md: 10 }} flex="2">
              <Heading fontSize="2xl" fontWeight="extrabold">
                Carrito de compras
              </Heading>
              <Stack spacing={6}>
                {orderProducts.map(orderProduct => (
                  <CartItem
                    key={orderProduct.id}
                    product={orderProduct}
                    onChangeQuantity={updateOrderProduct}
                    onClickDelete={deleteOrderProduct}
                    alertRef={alertDialogRef}
                  />
                ))}
              </Stack>
            </Stack>
            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary
                subtotal={orderTotalPrice}
                totalItems={orderTotalItems}
                totalPrice={orderTotalPrice}
                handleSendButton={() => navigate('/procesar')}
              />
              <HStack mt="6" fontWeight="semibold">
                <p>o</p>
                <LinkButton pathname={`/tienda/${shop.id}`} color="blue.500">
                  Seguir comprando
                </LinkButton>
              </HStack>
            </Flex>
          </Stack>
        )}
      </Container>
    </Box>
  )
}

export default ShopCart
