import {
  Box,
  ButtonGroup,
  Collapse,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Tooltip,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { RiCloseLine, RiLoginBoxLine, RiMenuLine, RiQuestionLine, RiStore3Fill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../../hooks'
import { filterChange } from '../../reducers/filterReducer'
import { deleteAllProducts } from '../../reducers/productsOrderReducer'
import { getItemFromLocalStorage, getOrderTotalItems } from '../../utils'
import AppLogo from '../AppLogo'
import LinkButton from '../fields/LinkButton'
import HelpSteps from './HelpSteps'
import ModalButton from './ModalButton'
import ShopCartButton from './ShopCartButton'

const navbarOptions = ['Tiendas', 'Productos'].map(item => (
  <LinkButton key={item} pathname="#" color="gray.500" fontWeight="semibold" fontSize="lg">
    {item}
  </LinkButton>
))

const AdminButton = ({ handleClick }) => {
  const user = getItemFromLocalStorage('loggedTiqueAppUser') || null

  return (
    <Tooltip label={user ? 'Mi tienda' : 'Iniciar sesión'}>
      <IconButton
        variant="ghost"
        icon={<Icon as={user ? RiStore3Fill : RiLoginBoxLine} boxSize={6} />}
        onClick={handleClick}
      />
    </Tooltip>
  )
}

const NavbarButtons = ({ onClickCartButton, onClickAdminButton }) => (
  <HStack>
    <ModalButton
      icon={<Icon as={RiQuestionLine} boxSize={6} />}
      buttonTooltipText="Ayuda"
      modalTitle="Bienvenido a Tique"
      modalChildren={<HelpSteps />}
      variant="ghost"
    />
    <ShopCartButton items={getOrderTotalItems()} handleClick={onClickCartButton} />
    <AdminButton handleClick={onClickAdminButton} />
  </HStack>
)

const Navbar = () => {
  const mobileNav = useDisclosure()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isDesktop } = useResponsive()

  const handleAppLogo = () => {
    dispatch(deleteAllProducts())
    dispatch(filterChange({ mode: 'ALL' }))
    navigate('/')
  }

  return (
    <Box as="section" position="fixed" width="full" backgroundColor="white" top={0} zIndex={3}>
      <Box as="nav" boxShadow="sm">
        <Container maxW="5xl" paddingY={5}>
          <HStack spacing="10" justify="space-between">
            <AppLogo cursor="pointer" onClick={handleAppLogo} />
            {isDesktop ? (
              <Flex justify="space-between" align="center" flex="1">
                <ButtonGroup spacing="8">{navbarOptions}</ButtonGroup>
                <NavbarButtons
                  onClickCartButton={() => navigate('/carrito')}
                  onClickAdminButton={() => navigate('/admin')}
                />
              </Flex>
            ) : (
              <HStack justify="end">
                <NavbarButtons
                  onClickCartButton={() => navigate('/carrito')}
                  onClickAdminButton={() => navigate('/admin')}
                />
                <IconButton
                  variant="ghost"
                  icon={mobileNav.isOpen ? <Icon as={RiCloseLine} boxSize={6} /> : <Icon as={RiMenuLine} boxSize={6} />}
                  aria-label="Open Menu"
                  onClick={mobileNav.onToggle}
                />
              </HStack>
            )}
          </HStack>
        </Container>
      </Box>
      <Box boxShadow="md">
        <Collapse in={mobileNav.isOpen} animateOpacity unmountOnExit>
          <VStack display={mobileNav.isOpen ? 'flex' : 'none'} flexDirection="column" spacing={4} padding={4}>
            {navbarOptions}
          </VStack>
        </Collapse>
      </Box>
    </Box>
  )
}

AdminButton.propTypes = {
  handleClick: PropTypes.func
}

NavbarButtons.propTypes = {
  onClickCartButton: PropTypes.func,
  onClickAdminButton: PropTypes.func
}

export default Navbar
