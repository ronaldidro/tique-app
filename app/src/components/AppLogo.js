import { Text } from '@chakra-ui/react'
import { CreativeTimLogo } from './icons/Icons'
import { APP_NAME } from '../utils'

const AppLogo = () => (
  <>
    <CreativeTimLogo w="32px" h="32px" me="10px" />
    <Text fontWeight="bold" fontSize="xl" fontFamily="monospace">
      {APP_NAME.toUpperCase()}
    </Text>
  </>
)

export default AppLogo
