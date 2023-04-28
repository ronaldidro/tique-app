import { HStack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { formatPrice } from '../../utils'

const Price = ({ isOnSale, children }) => (
  <Text
    as="span"
    fontWeight="medium"
    color={isOnSale ? 'gray.400' : 'gray.700'}
    textDecoration={isOnSale ? 'line-through' : 'none'}
  >
    {children}
  </Text>
)

const SalePrice = props => <Text as="span" fontWeight="semibold" color="gray.800" {...props} />

const PriceTag = ({ price, salePrice }) => (
  <HStack spacing={1}>
    <Price isOnSale={!!salePrice}>{formatPrice(price)}</Price>
    {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
  </HStack>
)

PriceTag.propTypes = {
  price: PropTypes.number,
  salePrice: PropTypes.node
}

Price.propTypes = {
  isOnSale: PropTypes.bool,
  children: PropTypes.node
}

export default PriceTag
