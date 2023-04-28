import { Button, ModalBody, useDisclosure } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ModalDialog from '../overlay/ModalDialog'
import ProductDetail from './ProductDetail'

const ProductDetailModal = ({ productData, submitOrderProduct }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addOrderProduct = values => {
    submitOrderProduct(values)
    onClose()
  }

  return (
    <>
      <Button variant="link" onClick={onOpen} textDecoration="underline" fontWeight="medium" color="gray.600">
        Ver detalles
      </Button>
      <ModalDialog isOpen={isOpen} onClose={onClose} size={['full', '4xl']}>
        <ModalBody padding={0}>
          <ProductDetail productData={productData} handleAddProduct={addOrderProduct} handleBackButton={onClose} />
        </ModalBody>
      </ModalDialog>
    </>
  )
}

ProductDetailModal.propTypes = {
  productData: PropTypes.object,
  submitOrderProduct: PropTypes.func
}

export default ProductDetailModal
