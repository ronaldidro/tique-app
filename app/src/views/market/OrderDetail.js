import { useNavigate } from 'react-router-dom'
import { Badge, Box, Divider, Flex, Heading, IconButton, Spacer, Text } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import OrderFormButton from '../../components/market/OrderFormButton'
import OrderList from '../../components/market/OrderList'
import { getProductsOrder } from '../../utils'

const OrderDetail = () => {
  const navigate = useNavigate()
  const productsOrder = getProductsOrder()
  const orderTotalPrice = productsOrder.reduce((acc, product) => acc + product.totalPrice, 0)
  const orderTotalItems = productsOrder.reduce((acc, product) => acc + product.quantity, 0)

  return (
    <Box paddingX={[4, 0]}>
      <Flex alignItems="center" paddingY={4}>
        <IconButton icon={<ChevronLeftIcon />} onClick={() => navigate(-1)} />
        <Heading size="md" paddingLeft={4}>
          Tu Pedido
        </Heading>
        <Spacer />
        <Flex gap={2}>
          <Text as="em">Items:</Text>
          <Badge fontSize="md">{orderTotalItems}</Badge>
          <Text as="em">Total:</Text>
          <Badge fontSize="md" colorScheme="green">
            S/ {orderTotalPrice.toFixed(2)}
          </Badge>
        </Flex>
      </Flex>
      <Divider />
      <OrderList productsOrder={productsOrder} />
      {productsOrder.length > 0 ? (
        <OrderFormButton />
      ) : (
        <Text textAlign="center" fontWeight="bold" marginY={5}>
          No se encontraron productos
        </Text>
      )}
    </Box>
  )
}

export default OrderDetail
