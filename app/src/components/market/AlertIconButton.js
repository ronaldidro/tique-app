import {
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import Alert from '../overlay/Alert'

const AlertIconButton = forwardRef(
  ({ mobileButtonLabel, alertTitle, alertContent, icon, handleAfirmativeOption, ...props }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const closeAlert = () => onClose()

    useImperativeHandle(ref, () => {
      return { closeAlert }
    })

    return (
      <>
        <Button
          display={['block', 'none']}
          variant="link"
          textDecoration="underline"
          fontSize="sm"
          fontWeight="light"
          color="gray.800"
          onClick={onOpen}
        >
          {mobileButtonLabel}
        </Button>
        <IconButton display={['none', 'block']} icon={icon} onClick={onOpen} {...props} />
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
  }
)

AlertIconButton.displayName = 'AlertIconButton'

AlertIconButton.propTypes = {
  mobileButtonLabel: PropTypes.string,
  alertTitle: PropTypes.string,
  alertContent: PropTypes.string,
  icon: PropTypes.element,
  handleAfirmativeOption: PropTypes.func
}

export default AlertIconButton
