import { Avatar, Box, Heading, Icon, Image, Link, Stack, Text, VStack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaCalendarDay } from 'react-icons/fa'
import { socialNetworkIcons } from '../../utils'
import AttentionSchedule from './AttentionSchedule'
import ModalButton from './ModalButton'

const Header = ({ shopData }) => {
  const { url: headboardImageUrl } = shopData.images.find(item => item.type === 'headboard')
  const { url: profileImageUrl } = shopData.images.find(item => item.type === 'profile')

  return (
    <Box paddingTop={[0, 5]}>
      <Box position="relative" height={['150px', '250px']}>
        <Image
          src={headboardImageUrl}
          alt="Headboard Image"
          objectFit="cover"
          width="full"
          borderRadius={['none', 'lg']}
          maxHeight="full"
        />
        <ModalButton
          icon={<Icon as={FaCalendarDay} />}
          buttonTooltipText="Horarios"
          position="absolute"
          top="0"
          right="0"
          marginTop={3}
          marginRight={3}
          colorScheme="blackAlpha"
          modalTitle="Horarios de atención"
          modalChildren={
            <AttentionSchedule
              attentionDays={shopData.attentionSchedule}
              address={shopData.address}
              placeService={shopData.placeService}
            />
          }
        />
      </Box>
      <Box position="relative" marginX={[4, 0]}>
        <Box display={{ md: 'flex' }}>
          <Avatar marginTop={['-10', '-5']} size="2xl" src={profileImageUrl} />
          <VStack alignItems="left" marginTop={[2]} marginLeft={[0, 2]}>
            <Heading as="h1" fontSize="2xl">
              {shopData.name}
            </Heading>
            <Text width={['full', '3xl']} textAlign={['justify', 'left']}>
              {shopData.description}
            </Text>
            <Text>{shopData.address}</Text>
          </VStack>
        </Box>
        <Box position="absolute" top="0" right="0" marginY={[4, 8]}>
          <Stack direction="row">
            {shopData.socialNetworks.map(({ type, url }, index) => (
              <Link key={index} href={url} isExternal>
                {socialNetworkIcons.find(item => item.type === type).icon}
              </Link>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

Header.propTypes = {
  shopData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default Header
