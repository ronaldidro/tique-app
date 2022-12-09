import { CheckCircleIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Image, Spacer, Tag, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { convertToPercent, getDiscountedPrice, getProductOrderById } from '../../utils'
import ProductDetailModal from './ProductDetailModal'

const Product = ({ productData }) => {
  const productOrder = getProductOrderById(productData.id)
  const { url: productImageUrl } = productData.images.find(item => item.type === 'root')

  return (
    <Flex shadow="md" borderWidth="1px" borderRadius="xl">
      <Image
        borderInlineStartRadius="xl"
        boxSize="130px"
        objectFit="cover"
        src={productImageUrl}
        alt="Product Image"
        width="25%"
      />
      <Flex flexDirection="column" justifyContent="space-between" padding={3} width="75%">
        <Box>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h3" fontSize="md">
              {productData.name}
              {productOrder && <CheckCircleIcon color="red.500" marginLeft={2} />}
            </Heading>
            {productData.discount > 0 && <Tag colorScheme="messenger">- {convertToPercent(productData.discount)}</Tag>}
          </Flex>
          <Text noOfLines={2}>{productData.description}</Text>
        </Box>
        <Flex alignItems="center">
          <Text paddingRight={2} fontWeight="semibold">
            S/ {getDiscountedPrice(productData.price, productData.discount)}
          </Text>
          {productData.discount > 0 && <Text as="del">S/ {productData.price.toFixed(2)}</Text>}
          <Spacer />
          <ProductDetailModal productData={productData} />
        </Flex>
      </Flex>
    </Flex>
  )
}

Product.propTypes = {
  productData: PropTypes.object
}

export default Product
