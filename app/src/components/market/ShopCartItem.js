import { CloseIcon } from '@chakra-ui/icons'
import { Flex, Image, Select, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { getProductImageUrl } from '../../utils'
import AlertIconButton from './AlertIconButton'
import PriceTag from './PriceTag'

export const QuantitySelect = props => (
  <Select
    maxWidth="68px"
    rounded="md"
    aria-label="Select quantity"
    focusBorderColor="blue.500"
    backgroundColor="white"
    {...props}
  >
    {Array.from({ length: 10 }, (_f, g) => g + 1).map(value => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
  </Select>
)

const CartProductMeta = ({ image, name, price, salePrice }) => (
  <Stack direction="row" align="center" spacing={5} width="full">
    <Image
      rounded="lg"
      width="120px"
      height="120px"
      fit="cover"
      src={image}
      alt={name}
      draggable="false"
      loading="lazy"
    />
    <Stack>
      <Text fontWeight="medium">{name}</Text>
      <PriceTag price={price} salePrice={salePrice} />
    </Stack>
  </Stack>
)

const ShopCartItem = ({ product, onChangeQuantity, onClickDelete, alertRef }) => (
  <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
    <CartProductMeta
      name={product.name}
      image={getProductImageUrl(product.images)}
      price={product.price}
      salePrice={product.discount > 0 && product.discountedPrice}
    />
    {/* Desktop */}
    <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
      <QuantitySelect
        value={product.quantity}
        onChange={({ target }) => onChangeQuantity(Number(target.value), product)}
      />
      <PriceTag price={product.totalPrice} />
      <AlertIconButton
        alertTitle="Eliminar producto"
        alertContent={`¿Está seguro de eliminar ${product.name} del pedido?`}
        icon={<CloseIcon boxSize={3} />}
        handleAfirmativeOption={() => onClickDelete(product)}
        size="sm"
        variant="ghost"
        ref={alertRef}
      />
    </Flex>
    {/* Mobile */}
    <Flex mt="4" align="center" width="full" justify="space-between" display={{ base: 'flex', md: 'none' }}>
      <AlertIconButton
        mobileButtonLabel="Eliminar"
        alertTitle="Eliminar producto"
        alertContent={`¿Está seguro de eliminar ${product.name} del pedido?`}
        icon={<CloseIcon boxSize={3} />}
        handleAfirmativeOption={() => onClickDelete(product)}
        size="sm"
        variant="ghost"
        ref={alertRef}
      />
      <QuantitySelect
        value={product.quantity}
        onChange={({ target }) => onChangeQuantity(Number(target.value), product)}
      />
      <PriceTag price={product.totalPrice} />
    </Flex>
  </Flex>
)

CartProductMeta.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  salePrice: PropTypes.node
}

ShopCartItem.propTypes = {
  product: PropTypes.object,
  onChangeQuantity: PropTypes.func,
  onClickDelete: PropTypes.func,
  alertRef: PropTypes.object
}

export default ShopCartItem
