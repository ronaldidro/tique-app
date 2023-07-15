import { Avatar, Flex, Image } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ShopHeader = ({ coverImageUrl, profileImageUrl }) => (
  <>
    <Image
      src={coverImageUrl}
      fallbackSrc="https://placehold.co/500x300/A0AEC0/FFF?text=Portada"
      height="150px"
      w="full"
      objectFit="cover"
    />
    <Flex justify="center" marginTop={-12}>
      <Avatar src={profileImageUrl} size="2xl" alt="Shop" borderWidth="initial" borderColor="white" />
    </Flex>
  </>
)

ShopHeader.propTypes = {
  coverImageUrl: PropTypes.string,
  profileImageUrl: PropTypes.string
}

export default ShopHeader
