import { Icon, IconButton, Tooltip, chakra } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { RiShoppingCartLine } from 'react-icons/ri'

const ShopCartButton = ({ items, handleClick }) => (
  <Tooltip label={items > 0 ? 'Ver carrito' : 'Sin productos'}>
    <IconButton
      variant="ghost"
      onClick={handleClick}
      icon={
        <>
          <Icon as={RiShoppingCartLine} boxSize={6} />
          {items > 0 && (
            <chakra.span
              pos="absolute"
              top="-1px"
              right="-1px"
              px={2}
              py={1}
              fontSize="xs"
              fontWeight="bold"
              lineHeight="none"
              color="red.100"
              transform="translate(50%,-50%)"
              bg="red.600"
              rounded="full"
              zIndex={2}
            >
              {items}
            </chakra.span>
          )}
        </>
      }
    />
  </Tooltip>
)

ShopCartButton.propTypes = {
  items: PropTypes.number,
  handleClick: PropTypes.func
}

export default ShopCartButton
