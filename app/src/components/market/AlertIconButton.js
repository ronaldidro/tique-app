import { forwardRef, useImperativeHandle, useRef } from 'react'
import {
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Alert from '../overlay/Alert'

const AlertIconButton = forwardRef(({ alertTitle, alertContent, icon, handleAfirmativeOption }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const closeAlert = () => onClose

  useImperativeHandle(ref, () => {
    return { closeAlert }
  })

  return (
    <>
      <IconButton colorScheme="red" size={['sm', 'md']} icon={icon} onClick={onOpen} />
      <Alert isOpen={isOpen} onClose={onClose} cancelRef={cancelRef}>
        <AlertDialogHeader>{alertTitle}</AlertDialogHeader>
        <AlertDialogBody>{alertContent}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" ml={3} onClick={handleAfirmativeOption}>
            Si
          </Button>
        </AlertDialogFooter>
      </Alert>
    </>
  )
})

AlertIconButton.displayName = 'AlertIconButton'

AlertIconButton.propTypes = {
  alertTitle: PropTypes.string,
  alertContent: PropTypes.string,
  icon: PropTypes.element,
  handleAfirmativeOption: PropTypes.func
}

export default AlertIconButton
