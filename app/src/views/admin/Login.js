import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'

const Login = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Tique App Admin</Heading>
          <Text fontSize="lg" color="gray.600">
            Ingresa tus credenciales para iniciar sesión ✌️
          </Text>
        </Stack>
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="text">
              <FormLabel>Usuario</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button bg="blue.400" color="white" _hover={{ bg: 'blue.500' }}>
              Iniciar sesión
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login
