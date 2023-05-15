import { ChatIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Flex, Image, List, ListIcon, ListItem, Select, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { getImageTypeUrl } from '../../utils'
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

const ChosenAttributes = ({ attributesData }) => (
  <List>
    {attributesData.map((attribute, index) => (
      <ListItem key={index} fontSize={{ base: '2xs', md: 'xs' }}>
        <ListIcon as={CheckIcon} />
        {Object.keys(attribute)}: {Object.values(attribute)}
      </ListItem>
    ))}
  </List>
)

const CommentsContent = ({ commentsText }) => (
  <Text fontSize={{ base: '2xs', md: 'xs' }}>
    <ChatIcon mr={2} />
    Comentarios: {commentsText}
  </Text>
)

export const ProductSpecifications = ({ chosenAttributes, comments }) => (
  <>
    {chosenAttributes && <ChosenAttributes attributesData={chosenAttributes} />}
    {comments && <CommentsContent commentsText={comments} />}
  </>
)

const CartProductMeta = ({ image, name, price, salePrice, attributes, comments }) => (
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
      <ProductSpecifications chosenAttributes={attributes} comments={comments} />
    </Stack>
  </Stack>
)

const ShopCartItem = ({ product, onChangeQuantity, onClickDelete, alertRef }) => (
  <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
    <CartProductMeta
      name={product.name}
      image={getImageTypeUrl(product.images)}
      price={product.price}
      salePrice={product.discount > 0 && product.discountedPrice}
      attributes={product.chosenAttributes}
      comments={product.comments}
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
        alertContent={`¿Deseas quitar ${product.name} del carrito?`}
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
        alertContent={`¿Deseas quitar ${product.name} del carrito?`}
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

ChosenAttributes.propTypes = {
  attributesData: PropTypes.array
}

CommentsContent.propTypes = {
  commentsText: PropTypes.string
}

ProductSpecifications.propTypes = {
  chosenAttributes: PropTypes.array,
  comments: PropTypes.string
}

CartProductMeta.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  salePrice: PropTypes.node,
  attributes: PropTypes.array,
  comments: PropTypes.string
}

ShopCartItem.propTypes = {
  product: PropTypes.object,
  onChangeQuantity: PropTypes.func,
  onClickDelete: PropTypes.func,
  alertRef: PropTypes.object
}

export default ShopCartItem
