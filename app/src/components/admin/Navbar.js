import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import { NavLink as RouterLink } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'
import { CreativeTimLogo } from '../icons/Icons'

const NavLink = ({ children, route }) => (
  <Link
    as={RouterLink}
    to={route}
    paddingX={2}
    paddingY={1}
    rounded="md"
    _hover={{ textDecoration: 'none', background: 'gray.200' }}
    _activeLink={{ background: 'teal.200' }}
  >
    {children}
  </Link>
)

const Navbar = ({ navBarOptions }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box background="gray.100" paddingX={4}>
      <Flex height={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <CreativeTimLogo w="32px" h="32px" me="10px" />
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {navBarOptions.map(({ text, route }, index) => (
              <NavLink key={index} route={route}>
                {text}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Menu>
            <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
              <Avatar size="sm" />
            </MenuButton>
            <MenuList>
              <MenuItem>Company Name</MenuItem>
              <MenuDivider />
              <MenuItem>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {navBarOptions.map(({ text, route }, index) => (
              <NavLink key={index} route={route}>
                {text}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

Navbar.propTypes = {
  navBarOptions: PropTypes.array
}

NavLink.propTypes = {
  children: PropTypes.string,
  route: PropTypes.string
}

export default Navbar
