import { Button, ModalBody, ModalHeader, useDisclosure } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import ModalDialog from '../overlay/ModalDialog'
import OrderForm from './OrderForm'

const OrderFormButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
        Finalizar
      </Button>
      <ModalDialog isOpen={isOpen} onClose={onClose} size={['full', 'xl']}>
        <ModalHeader>Ingresa tu información</ModalHeader>
        <ModalBody>
          <OrderForm closeForm={onClose} />
        </ModalBody>
      </ModalDialog>
    </>
  )
}

export default OrderFormButton
