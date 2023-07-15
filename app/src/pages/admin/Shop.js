import { Box, Flex } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ShopAdd from '../../components/admin/ShopAdd'
import ShopEdit from '../../components/admin/ShopEdit'

const Shop = ({ user }) => (
  <Flex justify="center">
    <Box w="full" maxW="md" bg="white" rounded="xl" boxShadow="lg" overflow="hidden">
      {user.shop ? <ShopEdit id={user.shop} /> : <ShopAdd user={user} />}
    </Box>
  </Flex>
)

Shop.propTypes = {
  user: PropTypes.object
}

export default Shop
