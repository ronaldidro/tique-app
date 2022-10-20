import { Flex, Spinner } from '@chakra-ui/react'

const CircularSpinner = () => {
  return (
    <Flex alignItems="center" justifyContent="center" height="container.md">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
    </Flex>
  )
}

export default CircularSpinner
