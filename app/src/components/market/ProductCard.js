import { AspectRatio, Box, HStack, Image, Skeleton, Stack, Tag, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useCustomToast, useResponsive } from '../../hooks'
import { addProduct } from '../../reducers/productsOrderReducer'
import { convertToPercent, getDiscountedPrice, getImageTypeUrl, getProductsOrder } from '../../utils'
import PriceTag from './PriceTag'
import ProductDrawer from './ProductDrawer'

const ProductCard = ({ productData }) => {
  const orderProducts = getProductsOrder()
  const dispatch = useDispatch()
  const { showToast } = useCustomToast()
  const { isDesktop } = useResponsive()
  const productImageUrl = getImageTypeUrl(productData.images)
  const isDiscounted = productData.discount > 0
  const productSalePrice = isDiscounted
    ? getDiscountedPrice(productData.price, productData.discount)
    : productData.price
  const totalQuantity = orderProducts
    .filter(product => product.name === productData.name)
    .reduce((acc, product) => acc + product.quantity, 0)

  const addProductToOrder = ({ comments, chosenAttributes, quantity, discountedPrice, totalPrice }) => {
    const productOrder = {
      ...productData,
      comments,
      chosenAttributes,
      quantity,
      discountedPrice,
      totalPrice,
      orderProductId: Date.now()
    }

    dispatch(addProduct(productOrder))

    showToast({
      title: 'Se añadió al carrito',
      description: `${productData.name} (x${quantity})`,
      status: 'success',
      position: isDesktop ? 'top' : 'top-right',
      variant: 'subtle',
      isClosable: true
    })
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
      <Stack spacing={1}>
        <HStack justify="space-between">
          <Text fontWeight="medium" color="gray.700" noOfLines={1}>
            {productData.name}
          </Text>
          {totalQuantity > 0 && <Tag colorScheme="purple">{totalQuantity}</Tag>}
        </HStack>
        <PriceTag price={productData.price} salePrice={isDiscounted && productSalePrice} />
      </Stack>
      <ProductDrawer
        productData={{ ...productData, isDiscounted, productSalePrice }}
        handleAddProduct={addProductToOrder}
      />
    </Stack>
  )
}

ProductCard.propTypes = {
  productData: PropTypes.object
}

export default ProductCard
