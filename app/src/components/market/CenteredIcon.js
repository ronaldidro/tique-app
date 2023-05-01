import { Box, Button, Center, Icon, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const CenteredIcon = ({ icon, description, showButton = true, handleReturnButton }) => (
  <Center minHeight="2xl">
    <Box textAlign="center">
      <Icon as={icon} boxSize={40} />
      <Text fontWeight="bold" marginY={5}>
        {description}
      </Text>
      {showButton && (
        <Button colorScheme="blue" size="lg" onClick={handleReturnButton}>
          Regresar
        </Button>
      )}
    </Box>
  </Center>
)

CenteredIcon.propTypes = {
  icon: PropTypes.elementType,
  description: PropTypes.string,
  showButton: PropTypes.bool,
  handleReturnButton: PropTypes.func
}

export default CenteredIcon
