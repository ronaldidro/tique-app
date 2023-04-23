import { HStack, Text } from '@chakra-ui/react'
import { APP_NAME } from '../utils'
import { TiqueAppLogo } from './icons/Icons'

const AppLogo = ({ ...props }) => (
  <HStack spacing={1} alignItems="start" {...props}>
    <TiqueAppLogo w="32px" h="32px" />
    <Text fontWeight="extrabold" color="gray.600" fontSize="2xl" textTransform="capitalize">
      {APP_NAME}
    </Text>
  </HStack>
)

export default AppLogo
