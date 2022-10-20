import { CheckCircleIcon } from '@chakra-ui/icons'
import { Button, List, ListIcon, ListItem, ModalBody, ModalFooter, ModalHeader, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { usageSteps } from '../../utils'
import ModalDialog from '../overlay/ModalDialog'

const UsageStep = ({ step }) => (
  <ListItem display="flex" alignItems="center">
    <ListIcon as={CheckCircleIcon} color="green.500" />
    {step}
  </ListItem>
)

const UsageStepsModal = ({ isOpen, onClose }) => {
  return (
    <ModalDialog isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalHeader>Bienvenido a Tique App</ModalHeader>
      <ModalBody>
        <Text paddingBottom={3}>Realiza tu pedido con estos sencillos pasos:</Text>
        <List spacing={3}>
          {usageSteps.map((description, index) => (
            <UsageStep key={index} step={description} />
          ))}
        </List>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="green" width="full" onClick={onClose}>
          ¡Genial!
        </Button>
      </ModalFooter>
    </ModalDialog>
  )
}

UsageStep.propTypes = {
  step: PropTypes.string
}

UsageStepsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default UsageStepsModal
