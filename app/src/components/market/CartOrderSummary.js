import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { formatPrice } from '../../utils'
import OrderFormButton from './OrderFormButton'

const OrderSummaryItem = ({ label, value, children }) => (
  <Flex justify="space-between" fontSize="sm">
    <Text fontWeight="medium" color="gray.600">
      {label}
    </Text>
    {value ? <Text fontWeight="medium">{value}</Text> : children}
  </Flex>
)

const CartOrderSummary = ({ subtotal, totalItems, totalPrice }) => (
  <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full" backgroundColor="white">
    <Heading size="md">Resumen del pedido</Heading>
    <Stack spacing="6">
      <OrderSummaryItem label="Artículos" value={totalItems} />
      <OrderSummaryItem label="Subtotal" value={formatPrice(subtotal)} />
      <Flex justify="space-between">
        <Text fontSize="lg" fontWeight="semibold">
          Total
        </Text>
        <Text fontSize="xl" fontWeight="extrabold">
          {formatPrice(totalPrice)}
        </Text>
      </Flex>
    </Stack>
    <OrderFormButton />
  </Stack>
)

OrderSummaryItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
  children: PropTypes.node
}

CartOrderSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired
}

export default CartOrderSummary
