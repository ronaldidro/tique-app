import { AlertDialog, AlertDialogCloseButton, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Alert = ({ children, isOpen, onClose, cancelRef, motionPreset = 'slideInBottom' }) => {
  return (
    <AlertDialog
      motionPreset={motionPreset}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogCloseButton />
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}

Alert.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  cancelRef: PropTypes.object,
  motionPreset: PropTypes.string
}

export default Alert
