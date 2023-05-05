import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { formatPrice, getImageTypeUrl } from '../../utils'
import PriceTag from './PriceTag'
import { QuantitySelect } from './ShopCartItem'
import { OrderSummaryItem } from './ShopCartSummary'

const CheckoutSummaryItem = ({ productData, handleQuantityChange }) => (
  <Stack direction="row" spacing={5} borderBottom="1px" borderColor="gray.200" paddingBottom={6}>
    <Image
      rounded="lg"
      height="96px"
      fit="cover"
      src={getImageTypeUrl(productData.images)}
      alt={productData.name}
      width="28%"
    />
    <Stack width="72%">
      <Flex justify="space-between">
        <Text fontWeight="semibold" noOfLines={1}>
          {productData.name}
        </Text>
        <Text fontWeight="medium">{formatPrice(productData.totalPrice)}</Text>
      </Flex>
      <PriceTag price={productData.price} salePrice={productData.discount > 0 && productData.discountedPrice} />
      <QuantitySelect
        size="sm"
        value={productData.quantity}
        onChange={({ target }) => handleQuantityChange(Number(target.value), productData)}
      />
    </Stack>
  </Stack>
)

const OrderCheckoutSummary = ({ products, totalItems, totalPrice, onChangeQuantity }) => (
  <>
    <Heading fontSize="xl" fontWeight="bold">
      Resumen del pedido
    </Heading>
    <Stack direction="column" spacing={6} width="full" marginTop={[6, 10]}>
      {products.map(product => (
        <CheckoutSummaryItem key={product.id} productData={product} handleQuantityChange={onChangeQuantity} />
      ))}
    </Stack>
    <Stack spacing={3} paddingY={6} borderBottom="1px" borderColor="gray.200">
      <OrderSummaryItem label="Artículos" value={totalItems} />
      <OrderSummaryItem label="Envío" value={formatPrice(0)} />
      <OrderSummaryItem label="Subtotal" value={formatPrice(totalPrice)} />
    </Stack>
    <Stack spacing={[6, 10]} paddingTop={6}>
      <Flex justify="space-between">
        <Text fontSize="lg" fontWeight="semibold">
          Total del pedido
        </Text>
        <Text fontSize="xl" fontWeight="extrabold">
          {formatPrice(totalPrice)}
        </Text>
      </Flex>
      <Button colorScheme="blue" size="lg" type="submit">
        Finalizar
      </Button>
    </Stack>
  </>
)

CheckoutSummaryItem.propTypes = {
  productData: PropTypes.object.isRequired,
  handleQuantityChange: PropTypes.func
}

OrderCheckoutSummary.propTypes = {
  products: PropTypes.array,
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
  onChangeQuantity: PropTypes.func,
  shopCartUrl: PropTypes.string
}

export default OrderCheckoutSummary
