import { ChevronRightIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Image,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { deleteProduct, updateProduct } from '../../reducers/productsOrderReducer'
import { formatPrice } from '../../utils'
import AlertIconButton from './AlertIconButton'

const OrderListItem = ({ productData }) => {
  const dispatch = useDispatch()
  const alertDialogRef = useRef()
  const { url: productImageUrl } = productData.images.find(item => item.type === 'root')

  const updateOrderProduct = value => {
    const quantityUpdated = parseInt(value)
    const totalPriceUpdated = productData.discountedPrice * quantityUpdated
    const productUpdated = { ...productData, quantity: quantityUpdated, totalPrice: totalPriceUpdated }

    dispatch(updateProduct(productUpdated))
  }

  const deleteOrderProduct = () => {
    dispatch(deleteProduct(productData))
    alertDialogRef.current.closeAlert()
  }

  return (
    <ListItem borderBottom="1px" borderColor="blackAlpha.500">
      <Flex alignItems="center" paddingY={4}>
        <Box display="flex" alignItems="center">
          <Image boxSize="60px" borderRadius="md" objectFit="cover" src={productImageUrl} alt="Dan Abramov" />
          <Box paddingLeft={2}>
            <Text>{productData.name}</Text>
            <Text fontWeight="bold">{formatPrice(productData.discountedPrice)}</Text>
            {productData.comments && (
              <Text>
                <ChevronRightIcon /> {productData.comments}
              </Text>
            )}
          </Box>
        </Box>
        <Spacer />
        <HStack>
          <NumberInput
            backgroundColor="white"
            allowMouseWheel
            size={['sm', 'md']}
            maxW={[16, 20]}
            min={1}
            defaultValue={productData.quantity}
            onChange={value => updateOrderProduct(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <AlertIconButton
            alertTitle="Eliminar Producto"
            alertContent={`¿Está seguro de eliminar ${productData.name} del pedido?`}
            icon={<DeleteIcon />}
            handleAfirmativeOption={deleteOrderProduct}
            colorScheme="red"
            size={['sm', 'md']}
            ref={alertDialogRef}
          />
        </HStack>
      </Flex>
    </ListItem>
  )
}

OrderListItem.propTypes = {
  productData: PropTypes.object
}

export default OrderListItem
