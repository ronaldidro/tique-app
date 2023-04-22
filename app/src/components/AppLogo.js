import { HStack, Text } from '@chakra-ui/react'
import { TiqueAppLogo } from './icons/Icons'
import { APP_NAME } from '../utils'

const AppLogo = () => (
  <HStack spacing={1} alignItems="start">
    <TiqueAppLogo w="32px" h="32px" />
    <Text fontWeight="extrabold" color="gray.600" fontSize="2xl" textTransform="capitalize">
      {APP_NAME}
    </Text>
  </HStack>
)

export default AppLogo
