import { Box, IconButton, ModalBody, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ModalDialog from '../overlay/ModalDialog'

const ModalButton = ({
  icon,
  buttonTooltipText,
  modalTitle,
  modalChildren,
  modalFooter,
  modalSize = 'md',
  modalCentered = true,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box textAlign="center">
      <Tooltip label={buttonTooltipText}>
        <IconButton icon={icon} onClick={onOpen} {...props} />
      </Tooltip>
      <ModalDialog isOpen={isOpen} onClose={onClose} size={modalSize} isCentered={modalCentered}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalBody>{modalChildren}</ModalBody>
        <ModalFooter>{modalFooter}</ModalFooter>
      </ModalDialog>
    </Box>
  )
}

ModalButton.propTypes = {
  icon: PropTypes.element,
  buttonTooltipText: PropTypes.string,
  modalTitle: PropTypes.string,
  modalChildren: PropTypes.element,
  modalFooter: PropTypes.element,
  modalSize: PropTypes.node,
  modalCentered: PropTypes.bool
}

export default ModalButton
