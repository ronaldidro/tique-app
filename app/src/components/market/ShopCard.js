import { useNavigate } from 'react-router-dom'
import { Box, Heading, HStack, Icon, Image, Text } from '@chakra-ui/react'
import { FcEmptyFilter, FcShop } from 'react-icons/fc'
import PropTypes from 'prop-types'

const ShopCard = ({ shopData }) => {
  const navigate = useNavigate()
  const { url: initialImageUrl } = shopData.images.find(item => item.type === 'initial')

  return (
    <Box
      backgroundColor="white"
      shadow="md"
      borderWidth="1px"
      borderRadius="xl"
      cursor="pointer"
      onClick={() => navigate(`tienda/${shopData.id}`)}
    >
      <Image borderTopRadius="xl" src={initialImageUrl} alt="Dan Abramov" />
      <Box padding={3}>
        <Heading size="md" paddingBottom={[0, 2]} textAlign={['center', 'left']}>
          {shopData.name}
        </Heading>
        <Box display={['none', 'block']}>
          <HStack paddingBottom={2}>
            <Icon as={FcShop} />
            <Text noOfLines={2}>{shopData.address}</Text>
          </HStack>
          <HStack>
            <Icon as={FcEmptyFilter} />
            <Text noOfLines={2}>{shopData.placeService}</Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}

ShopCard.propTypes = {
  shopData: PropTypes.object
}

export default ShopCard
