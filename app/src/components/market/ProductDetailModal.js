import { AddIcon } from '@chakra-ui/icons'
import { IconButton, ModalBody, useDisclosure, useToast } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addProduct, updateProduct } from '../../reducers/productsOrderReducer'
import { getProductOrderById, setToastContent, showToast } from '../../utils'
import ModalDialog from '../overlay/ModalDialog'
import ProductDetail from './ProductDetail'

const ProductDetailModal = ({ productData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const toast = useToast()
  const productInOrder = getProductOrderById(productData.id)

  const addOrderProduct = event => {
    event.preventDefault()

    const quantity = parseInt(event.target.quantity.value)
    const discountedPrice = parseFloat(event.target.discountedPrice.value)
    const totalPrice = parseFloat(event.target.totalPrice.value)
    const comments = event.target.comments.value
    const productOrder = { ...productData, quantity, discountedPrice, totalPrice, comments }

    dispatch(productInOrder ? updateProduct(productOrder) : addProduct(productOrder))
    showToast(
      toast,
      setToastContent('Se añadió al carrito', `${quantity} ${productData.name}`, 'success', 'subtle', 'top', {
        isClosable: true
      })
    )
    onClose()
  }

  return (
    <>
      <IconButton onClick={onOpen} size="sm" icon={<AddIcon />} />
      <ModalDialog isOpen={isOpen} onClose={onClose} size={['full', '4xl']}>
        <ModalBody padding={0}>
          <ProductDetail productData={productData} handleAddProduct={addOrderProduct} handleBackButton={onClose} />
        </ModalBody>
      </ModalDialog>
    </>
  )
}

ProductDetailModal.propTypes = {
  productData: PropTypes.object
}

export default ProductDetailModal
