import { Drawer as ChakraDrawer, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Drawer = ({ isOpen, onClose, children, ...props }) => (
  <ChakraDrawer isOpen={isOpen} onClose={onClose} {...props}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      {children}
    </DrawerContent>
  </ChakraDrawer>
)

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Drawer
