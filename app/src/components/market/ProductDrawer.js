import {
  AspectRatio,
  Box,
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Image,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useResponsive } from '../../hooks'
import { formatPrice, getImageTypeUrl, getProductOrderById } from '../../utils'
import RadioField from '../fields/RadioField'
import TextAreaField from '../fields/TextAreaField'
import ImageSlider from '../media/ImageSlider'
import Drawer from '../overlay/Drawer'
import PriceTag from './PriceTag'
import QuantityPicker from './QuantityPicker'

const ProductImage = ({ product }) => {
  const productImageUrl = getImageTypeUrl(product.images)

  if (product.images.length > 1) return <ImageSlider imageData={product.images} />

  return (
    <AspectRatio ratio={4 / 3}>
      <Image src={productImageUrl} alt={`${product.name} image`} borderRadius={{ base: 'md', md: 'xl' }} />
    </AspectRatio>
  )
}

const ProductDetail = ({ product }) => (
  <VStack align="start" spacing={3} marginTop={3} marginBottom={5}>
    <PriceTag price={product.price} salePrice={product.isDiscounted && product.productSalePrice} />
    <Text textAlign="justify">{product.description}</Text>
  </VStack>
)

const AttributesSection = ({ attributesData = [] }) =>
  attributesData.map(({ description, values }, index) => (
    <Box key={index}>
      <RadioField
        label={description}
        name={`attributes[${index}].${description}`}
        options={values.map(value => ({ label: value, value }))}
        verticalOrientation
      />
    </Box>
  ))

const ProductDrawer = ({ productData, handleAddProduct }) => {
  const orderProduct = getProductOrderById(productData.id)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [quantity, setQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(orderProduct?.totalPrice || productData.productSalePrice)
  const { isDesktop } = useResponsive()

  const onClickAddButton = values => {
    handleAddProduct({
      ...values,
      chosenAttributes: values.attributes,
      quantity,
      discountedPrice: productData.productSalePrice,
      totalPrice
    })
    onClose()
  }

  const handleClose = () => {
    setQuantity(orderProduct?.quantity || 1) // because drawer does not unmounted
    onClose()
  }

  useEffect(() => setTotalPrice(quantity * productData.productSalePrice), [quantity])

  useEffect(() => setQuantity(orderProduct?.quantity || 1), [orderProduct]) // product added without drawer does not update quantity

  return (
    <>
      <Button variant="link" onClick={onOpen} textDecoration="underline" fontWeight="medium" color="gray.600">
        Ver detalles
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={handleClose}
        placement={isDesktop ? 'right' : 'left'}
        size={{ base: 'xs', md: 'sm' }}
      >
        <DrawerHeader>{productData.name}</DrawerHeader>
        <DrawerBody paddingTop={0}>
          <ProductImage product={productData} />
          <ProductDetail product={productData} />
          <Formik initialValues={{ comments: '' }} onSubmit={onClickAddButton}>
            <Form id="product-form">
              <VStack align="start" spacing={3} padding={[3, 5]} border="1px" borderColor="gray.400" rounded="md">
                <AttributesSection attributesData={productData.attributes} />
                <TextAreaField label="Comentarios" name="comments" placeholder="Opcional" />
              </VStack>
            </Form>
          </Formik>
        </DrawerBody>
        <DrawerFooter flexDirection="column">
          <QuantityPicker value={quantity} setValue={setQuantity} />
          <Button width="full" marginTop={3} colorScheme="blue" type="submit" form="product-form">
            Añadir {formatPrice(totalPrice)}
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

ProductImage.propTypes = {
  product: PropTypes.object
}

ProductDetail.propTypes = {
  product: PropTypes.object
}

AttributesSection.propTypes = {
  attributes: PropTypes.array
}

ProductDrawer.propTypes = {
  productData: PropTypes.object,
  handleAddProduct: PropTypes.func
}

export default ProductDrawer
