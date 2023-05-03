import { AspectRatio, Box, Button, HStack, Image, Skeleton, Stack, Tag, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useCustomToast, useResponsive } from '../../hooks'
import { addProduct, updateProduct } from '../../reducers/productsOrderReducer'
import { convertToPercent, getDiscountedPrice, getImageTypeUrl, getProductOrderById } from '../../utils'
import PriceTag from './PriceTag'
import ProductDrawer from './ProductDrawer'

const ProductCard = ({ productData }) => {
  const orderProduct = getProductOrderById(productData.id)
  const dispatch = useDispatch()
  const { showToast } = useCustomToast()
  const { isDesktop } = useResponsive()
  const productImageUrl = getImageTypeUrl(productData.images)
  const isDiscounted = productData.discount > 0
  const productSalePrice = isDiscounted
    ? getDiscountedPrice(productData.price, productData.discount)
    : productData.price

  const addProductToOrder = ({ comments, quantity, discountedPrice, totalPrice }) => {
    const productOrder = { ...productData, comments, quantity, discountedPrice, totalPrice }

    dispatch(orderProduct ? updateProduct(productOrder) : addProduct(productOrder))

    showToast({
      title: 'Se añadió al carrito',
      description: `${productData.name} (x${quantity})`,
      status: 'success',
      position: isDesktop ? 'top' : 'top-right',
      variant: 'subtle',
      isClosable: true
    })
  }

  const handleAddButton = () => {
    const quantity = orderProduct ? orderProduct.quantity + 1 : 1
    const totalPrice = quantity * productSalePrice
    addProductToOrder({ discountedPrice: productSalePrice, quantity, totalPrice })
  }

  return (
    <Stack spacing={{ base: 4, md: 5 }}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={productImageUrl}
            alt={`${productData.name} image`}
            fallback={<Skeleton />}
            borderRadius={{ base: 'md', md: 'xl' }}
          />
        </AspectRatio>
        {isDiscounted && (
          <Tag backgroundColor="red.500" color="white" fontWeight="bold" position="absolute" top="3" right="3">
            -{convertToPercent(productData.discount)}
          </Tag>
        )}
      </Box>
      <Stack>
        <Stack spacing="1">
          <HStack justify="space-between">
            <Text fontWeight="medium" color="gray.700" noOfLines={1}>
              {productData.name}
            </Text>
            {orderProduct && <Tag colorScheme="purple">{orderProduct.quantity}</Tag>}
          </HStack>
          <PriceTag price={productData.price} salePrice={isDiscounted && productSalePrice} />
        </Stack>
      </Stack>
      <Stack align="center" spacing={3}>
        <Button colorScheme="blue" width="full" type="submit" onClick={handleAddButton}>
          Añadir al carrito
        </Button>
        <ProductDrawer
          productData={{ ...productData, isDiscounted, productSalePrice }}
          handleAddProduct={addProductToOrder}
        />
      </Stack>
    </Stack>
  )
}

ProductCard.propTypes = {
  productData: PropTypes.object
}

export default ProductCard
