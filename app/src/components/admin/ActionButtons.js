import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import PropTypes from 'prop-types'
import AlertIconButton from '../market/AlertIconButton'

const ActionButtons = ({ handleEditButton, handleDeleteButton, alertTitle, alertContent, alertRef }) => (
  <ButtonGroup variant="ghost" spacing={2}>
    <IconButton icon={<Icon as={BiEdit} boxSize={7} />} onClick={handleEditButton} />
    <AlertIconButton
      alertTitle={alertTitle}
      alertContent={alertContent}
      icon={<Icon as={BiTrash} boxSize={7} />}
      handleAfirmativeOption={handleDeleteButton}
      ref={alertRef}
    />
  </ButtonGroup>
)

ActionButtons.propTypes = {
  handleEditButton: PropTypes.func,
  handleDeleteButton: PropTypes.func,
  alertTitle: PropTypes.string,
  alertContent: PropTypes.string,
  alertRef: PropTypes.object
}

export default ActionButtons
