import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FiChevronDown, FiMenu } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { NavLink as RouterLink, useNavigate } from 'react-router-dom'
import { setUser } from '../../reducers/userReducer'
import { removeItemFromLocalStorage } from '../../utils'
import AppLogo from '../AppLogo'

const Sidebar = ({ children, sidebarOptions, userName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    removeItemFromLocalStorage(['loggedTiqueAppUser'])
    dispatch(setUser(null))
    navigate('/admin')
  }

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
      <MobileNav onOpen={onOpen} userName={userName} handleLogoutButton={handleLogout} />
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
      <AppLogo />
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {options.map(({ text, route, icon }, index) => (
      <NavItem key={index} icon={icon} route={route} onClick={onClose}>
        {text}
      </NavItem>
    ))}
  </Box>
)

const NavItem = ({ icon, children, route, ...rest }) => (
  <Link
    display="flex"
    as={RouterLink}
    to={route}
    padding={4}
    marginX={4}
    borderRadius="lg"
    _hover={{ textDecoration: 'none', background: 'gray.100' }}
    _activeLink={{ bg: 'blue.400', color: 'white' }}
    {...rest}
  >
    {icon && <Icon marginRight={4} boxSize="20px" as={icon} />}
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
    <Box display={{ base: 'block', md: 'none' }}>
      <AppLogo />
    </Box>
    <HStack spacing={{ base: '0', md: '6' }}>
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <HStack>
              <Avatar size="sm" />
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
  userName: PropTypes.string
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
