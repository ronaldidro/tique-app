import { CheckCircleIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { usageSteps } from '../../utils'

const UsageStep = ({ step }) => (
  <ListItem display="flex" alignItems="center">
    <ListIcon as={CheckCircleIcon} color="green.500" />
    {step}
  </ListItem>
)

const HelpSteps = () => (
  <>
    <Text paddingBottom={3}>Realiza tu pedido con estos sencillos pasos:</Text>
    <List spacing={3}>
      {usageSteps.map((description, index) => (
        <UsageStep key={index} step={description} />
      ))}
    </List>
  </>
)

UsageStep.propTypes = {
  step: PropTypes.string
}

export default HelpSteps
