import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Tag,
  Text,
  Textarea,
  useNumberInput
} from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { convertToPercent, getDiscountedPrice, getProductOrderById } from '../../utils'
import ImageSlider from '../media/ImageSlider'
import ProductFeature from './ProductFeature'

const ProductDetail = ({ productData, handleAddProduct, handleBackButton }) => {
  const price = getDiscountedPrice(productData.price, productData.discount)
  const productOrder = getProductOrderById(productData.id)
  const [priceCalc, setPriceCalc] = useState(productOrder ? productOrder.totalPrice.toFixed(2) : price)
  const { url: productImageUrl } = productData.images.find(item => item.type === 'root')

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    defaultValue: productOrder ? productOrder.quantity : 1,
    min: 1
  })
  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  useEffect(() => setPriceCalc((price * input.value).toFixed(2)), [input])

  return (
    <form onSubmit={handleAddProduct}>
      <Box display={{ md: 'flex' }} maxHeight="full">
        <IconButton
          position="absolute"
          visibility={['visible', 'hidden']}
          icon={<Icon as={FaArrowLeft} />}
          colorScheme="whiteAlpha"
          color="gray.700"
          size="sm"
          top={2}
          left={3}
          zIndex={2}
          onClick={handleBackButton}
        />
        {productData.images.length === 1 && (
          <Image
            objectFit="cover"
            src={productImageUrl}
            alt="Product Image"
            width={['100%', '50%']}
            height={['auto', 'lg']}
            roundedLeft={['none', 'md']}
          />
        )}
        {productData.images.length > 1 && <ImageSlider imageData={productData.images} />}
        <Box
          width={['100%', '50%']}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          padding={2}
          backgroundColor="white"
          overflowY={['none', 'scroll']}
          height={['auto', 'lg']}
          rounded="md"
        >
          <Box>
            <Heading as="h1" size="md" paddingTop={[0, 2]}>
              {productData.name}
            </Heading>
            <Text paddingTop={2}>{productData.description}</Text>
            <HStack spacing={5} paddingY={4}>
              <Text>S/ {price}</Text>
              {productData.discount > 0 && (
                <>
                  <Text as="del">S/ {productData.price.toFixed(2)}</Text>
                  <Tag colorScheme="messenger">- {convertToPercent(productData.discount)}</Tag>
                </>
              )}
            </HStack>
            <Divider />
            {productData.features &&
              productData.features.map((feature, index) => <ProductFeature key={index} featureData={feature} />)}
            <Flex justifyContent="space-between" paddingY={4}>
              <Text fontWeight="bold">Comentarios</Text>
              <Tag colorScheme="orange">Opcional</Tag>
            </Flex>
            <Textarea
              name="comments"
              defaultValue={productOrder?.comments}
              placeholder="Especifica los detalles de tu producto"
              height={!productData.features.length && '150px'}
              resize={['none', 'block']}
            />
          </Box>
          <Flex justifyContent="space-between" paddingTop={4}>
            <HStack maxWidth="150px">
              <Button {...dec} colorScheme="teal" variant="outline">
                -
              </Button>
              <Input {...input} name="quantity" textAlign="center" readOnly />
              <Button {...inc} colorScheme="teal" variant="outline">
                +
              </Button>
            </HStack>
            <Input display="none" name="discountedPrice" value={price} readOnly />
            <Input display="none" name="totalPrice" value={priceCalc} readOnly />
            <Button colorScheme="teal" type="sumbit">
              Agregar S/ {priceCalc}
            </Button>
          </Flex>
        </Box>
      </Box>
    </form>
  )
}

ProductDetail.propTypes = {
  productData: PropTypes.object,
  handleAddProduct: PropTypes.func,
  handleBackButton: PropTypes.func
}

export default ProductDetail
