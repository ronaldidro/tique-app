import { Box, Container, Divider, Text } from '@chakra-ui/react'

const Footer = () => (
  <Box backgroundColor="gray.50">
    <Container maxW="5xl">
      <Box textAlign="right">
        <Divider />
        <Text fontSize={['sm', 'md']} paddingTop={2}>
          &copy; {new Date().getFullYear()} Hatun Tech. Todos los derechos reservados.
        </Text>
      </Box>
    </Container>
  </Box>
)

export default Footer
