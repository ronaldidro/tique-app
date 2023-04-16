import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Spacer,
  Tag,
  Text
} from '@chakra-ui/react'
import { TbShoppingCartX } from 'react-icons/tb'
import OrderFormButton from '../../components/market/OrderFormButton'
import OrderList from '../../components/market/OrderList'
import { getProductsOrder, getOrderTotalPrice, getOrderTotalItems } from '../../utils'

const OrderDetail = () => {
  const navigate = useNavigate()
  const productsOrder = getProductsOrder()
  const orderTotalPrice = getOrderTotalPrice()
  const orderTotalItems = getOrderTotalItems()

  return (
    <Box backgroundColor="gray.50">
      <Container maxW="5xl">
        <Flex alignItems="center" paddingY={4}>
          <Heading fontSize="2xl">Tu pedido</Heading>
          <Spacer />
          <Box gap={[2, 4]} display={{ base: 'grid', md: 'flex' }} justifyItems="end">
            <HStack>
              <Text as="b">Artículos:</Text>
              <Tag fontWeight="bold" colorScheme="orange">
                {orderTotalItems}
              </Tag>
            </HStack>
            <HStack>
              <Text as="b">Total:</Text>
              <Tag fontWeight="bold" colorScheme="green">
                S/ {orderTotalPrice.toFixed(2)}
              </Tag>
            </HStack>
          </Box>
        </Flex>
        <Divider />
        {productsOrder.length > 0 ? (
          <Box display="grid" alignContent="space-between" minHeight="xl">
            <OrderList productsOrder={productsOrder} />
            <ButtonGroup marginY={5}>
              <Button colorScheme="red" width="50%" onClick={() => navigate(-1)}>
                Regresar
              </Button>
              <OrderFormButton />
            </ButtonGroup>
          </Box>
        ) : (
          <Center minHeight="xl">
            <Box textAlign="center">
              <Icon as={TbShoppingCartX} boxSize={40} />
              <Text fontWeight="bold" marginY={5}>
                El carrito está vacío
              </Text>
              <Button colorScheme="facebook" onClick={() => navigate(-1)}>
                Regresar
              </Button>
            </Box>
          </Center>
        )}
      </Container>
    </Box>
  )
}

export default OrderDetail
