import { ButtonGroup, Container, IconButton, Stack, Text } from '@chakra-ui/react'
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
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="https://www.instagram.com/ronaldidro/"
            target="_blank"
            aria-label="Instagram"
            icon={<FaInstagram fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="https://twitter.com/ronaldidro"
            target="_blank"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
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
