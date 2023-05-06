import { AspectRatio, Box, Heading, HStack, Icon, Image, Skeleton, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FcEmptyFilter, FcShop } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

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
      <AspectRatio ratio={1}>
        <Image src={initialImageUrl} fallback={<Skeleton />} borderTopRadius="xl" alt={`${shopData.name} image`} />
      </AspectRatio>
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
