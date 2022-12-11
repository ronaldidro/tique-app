import { Box, Container, Divider, Text } from '@chakra-ui/react'

const Footer = () => (
  <Container maxW="5xl">
    <Box textAlign="right">
      <Divider />
      <Text marginTop={2}>&copy; {new Date().getFullYear()} Hatun Tech. Todos los derechos reservados.</Text>
    </Box>
  </Container>
)

export default Footer
