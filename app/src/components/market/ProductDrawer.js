import {
  AspectRatio,
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Image,
  Text,
  Textarea,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useField, useResponsive } from '../../hooks'
import { formatPrice, getProductImageUrl, getProductOrderById } from '../../utils'
import ImageSlider from '../media/ImageSlider'
import Drawer from '../overlay/Drawer'
import PriceTag from './PriceTag'
import QuantityPicker from './QuantityPicker'

const ProductDrawer = ({ productData, handleAddProduct }) => {
  const orderProduct = getProductOrderById(productData.id)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [quantity, setQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(orderProduct?.totalPrice || productData.productSalePrice)
  const { isDesktop } = useResponsive()
  const commentsField = useField('comments', orderProduct?.comments || '')
  const productImageUrl = getProductImageUrl(productData.images)

  const onClickAddButton = () => {
    handleAddProduct({
      comments: commentsField.value,
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
          {productData.images.length > 1 ? (
            <ImageSlider imageData={productData.images} />
          ) : (
            <AspectRatio ratio={4 / 3}>
              <Image src={productImageUrl} alt={`${productData.name} image`} borderRadius={{ base: 'md', md: 'xl' }} />
            </AspectRatio>
          )}
          <VStack align="start" spacing={3} marginTop={3}>
            <PriceTag price={productData.price} salePrice={productData.isDiscounted && productData.productSalePrice} />
            <Text textAlign="justify">{productData.description}</Text>
            <Text fontWeight="medium">Comentarios</Text>
            <Textarea {...commentsField} placeholder="Opcional" />
          </VStack>
        </DrawerBody>
        <DrawerFooter flexDirection="column">
          <QuantityPicker value={quantity} setValue={setQuantity} />
          <Button width="full" marginTop={3} colorScheme="blue" onClick={onClickAddButton}>
            Añadir {formatPrice(totalPrice)}
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

ProductDrawer.propTypes = {
  productData: PropTypes.object,
  handleAddProduct: PropTypes.func
}

export default ProductDrawer
