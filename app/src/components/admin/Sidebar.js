import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { FiMenu, FiChevronDown } from 'react-icons/fi'
import { NavLink as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CreativeTimLogo } from '../icons/Icons'

const Sidebar = ({ children, sidebarOptions, userName, handleLogoutButton }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent onClose={() => onClose} options={sidebarOptions} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} options={sidebarOptions} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} userName={userName} handleLogoutButton={handleLogoutButton} />
      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, options, ...rest }) => (
  <Box
    transition="3s ease"
    bg="white"
    borderRight="1px"
    borderRightColor="gray.200"
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex h="20" alignItems="center" justifyContent="space-between" mx={4}>
      <Flex alignItems="center">
        <CreativeTimLogo w="32px" h="32px" me="10px" />
        <Text fontWeight="bold" fontSize="sm" fontFamily="monospace">
          TIQUE APP
        </Text>
      </Flex>
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {options.map(({ text, route, icon }, index) => (
      <NavItem key={index} icon={icon} route={route}>
        {text}
      </NavItem>
    ))}
  </Box>
)

const NavItem = ({ icon, children, route }) => (
  <Link
    display="flex"
    as={RouterLink}
    to={route}
    padding={4}
    marginX={4}
    borderRadius="lg"
    _hover={{ textDecoration: 'none', background: 'gray.100' }}
    _activeLink={{ bg: 'teal.400', color: 'white' }}
  >
    {icon && <Icon marginRight={4} as={icon} />}
    {children}
  </Link>
)

const MobileNav = ({ onOpen, userName, handleLogoutButton, ...rest }) => (
  <Flex
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 4 }}
    height="20"
    alignItems="center"
    bg="white"
    borderBottomWidth="1px"
    borderBottomColor="gray.200"
    justifyContent={{ base: 'space-between', md: 'flex-end' }}
    {...rest}
  >
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      onClick={onOpen}
      variant="outline"
      aria-label="open menu"
      icon={<FiMenu />}
    />
    <Box display={{ base: 'flex', md: 'none' }} alignItems="center">
      <CreativeTimLogo w="32px" h="32px" me="10px" />
      <Text fontWeight="bold" fontSize="sm" fontFamily="monospace">
        TIQUE APP
      </Text>
    </Box>
    <HStack spacing={{ base: '0', md: '6' }}>
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <HStack>
              <Avatar
                size="sm"
                src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              />
              <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                <Text fontSize="sm">{userName}</Text>
                <Text fontSize="xs" color="gray.600">
                  Administrador
                </Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList bg="white" borderColor="gray.200">
            <MenuItem>Mi Perfil</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogoutButton}>Cerrar sesión</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  </Flex>
)

Sidebar.propTypes = {
  children: PropTypes.element,
  sidebarOptions: PropTypes.array,
  userName: PropTypes.string,
  handleLogoutButton: PropTypes.func
}

SidebarContent.propTypes = {
  onClose: PropTypes.func,
  options: PropTypes.array
}

NavItem.propTypes = {
  icon: PropTypes.func,
  children: PropTypes.string,
  route: PropTypes.string
}

MobileNav.propTypes = {
  onOpen: PropTypes.func,
  userName: PropTypes.string,
  handleLogoutButton: PropTypes.func
}

export default Sidebar
