import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from '../../utils'

export const OrderSummaryItem = ({ label, value, children, ...props }) => (
  <Flex justify="space-between" {...props}>
    <Text fontWeight="medium" color="gray.600">
      {label}
    </Text>
    {value ? <Text fontWeight="medium">{value}</Text> : children}
  </Flex>
)

const ShopCartSummary = ({ subtotal, totalItems, totalPrice, handleSendButton }) => (
  <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full" backgroundColor="white">
    <Heading size="md">Resumen del pedido</Heading>
    <Stack spacing="6">
      <OrderSummaryItem label="Artículos" value={totalItems} fontSize="sm" />
      <OrderSummaryItem label="Envío" value={formatPrice(0)} fontSize="sm" />
      <OrderSummaryItem label="Subtotal" value={formatPrice(subtotal)} fontSize="sm" />
      <Flex justify="space-between">
        <Text fontSize="lg" fontWeight="semibold">
          Total
        </Text>
        <Text fontSize="xl" fontWeight="extrabold">
          {formatPrice(totalPrice)}
        </Text>
      </Flex>
    </Stack>
    <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={handleSendButton}>
      Procesar
    </Button>
  </Stack>
)

OrderSummaryItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
  children: PropTypes.node
}

ShopCartSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  handleSendButton: PropTypes.func.isRequired
}

export default ShopCartSummary
