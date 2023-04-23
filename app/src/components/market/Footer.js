import { ButtonGroup, Container, Icon, IconButton, Stack, Text } from '@chakra-ui/react'
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import AppLogo from '../AppLogo'

const Footer = () => (
  <Container maxW="5xl" as="footer" paddingY={5}>
    <Stack spacing={{ base: '4', md: '5' }}>
      <Stack justify="space-between" direction="row" align="center">
        <AppLogo />
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/ronaldidro/"
            target="_blank"
            aria-label="LinkedIn"
            icon={<Icon as={FaLinkedin} boxSize={6} />}
          />
          <IconButton
            as="a"
            href="https://www.instagram.com/ronaldidro/"
            target="_blank"
            aria-label="Instagram"
            icon={<Icon as={FaInstagram} boxSize={6} />}
          />
          <IconButton
            as="a"
            href="https://twitter.com/ronaldidro"
            target="_blank"
            aria-label="Twitter"
            icon={<Icon as={FaTwitter} boxSize={6} />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Hatun Tec. Todos los derechos reservados.
      </Text>
    </Stack>
  </Container>
)

export default Footer
