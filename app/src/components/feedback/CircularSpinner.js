import { Center, Spinner } from '@chakra-ui/react'

const CircularSpinner = () => (
  <Center minHeight="100vh">
    <Spinner thickness="4px" speed="0.65s" color="blue.500" emptyColor="gray.200" size="xl" />
  </Center>
)

export default CircularSpinner
