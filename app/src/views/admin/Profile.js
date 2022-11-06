import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react'

const Profile = () => {
  return (
    <Flex justify="center">
      <Stack spacing={4} w="full" maxW="md" bg="white" rounded="xl" boxShadow="lg" p={6}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Mi Perfil
        </Heading>
        <FormControl id="name" isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>Usuario</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500'
            }}
          >
            Guardar
          </Button>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500'
            }}
          >
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default Profile
