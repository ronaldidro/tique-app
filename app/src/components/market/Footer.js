import { Box, Divider, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box textAlign="right">
      <Divider />
      <Text marginTop={2} paddingX={[4, 0]}>
        &copy; {new Date().getFullYear()} Hatun Tech. Todos los derechos reservados.
      </Text>
    </Box>
  )
}

export default Footer
