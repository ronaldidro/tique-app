import { Box, Button, ModalBody, ModalHeader, useDisclosure } from '@chakra-ui/react'
import ModalDialog from '../overlay/ModalDialog'
import OrderForm from './OrderForm'

const OrderFormButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box marginY={5}>
      <Button onClick={onOpen} colorScheme="blue" width="full">
        Finalizar pedido
      </Button>
      <ModalDialog isOpen={isOpen} onClose={onClose} size={['full', 'xl']}>
        <ModalHeader>Ingresa tu información</ModalHeader>
        <ModalBody>
          <OrderForm closeForm={onClose} />
        </ModalBody>
      </ModalDialog>
    </Box>
  )
}

export default OrderFormButton
