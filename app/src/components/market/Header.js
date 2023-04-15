import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Heading, Icon, IconButton, Image, Link, Stack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { FaHome, FaCalendarDay, FaQuestionCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { filterChange } from '../../reducers/filterReducer'
import { deleteAllProducts } from '../../reducers/productsOrderReducer'
import { socialNetworkIcons } from '../../utils'
import AttentionSchedule from './AttentionSchedule'
import HelpSteps from './HelpSteps'
import ModalButton from './ModalButton'

const Header = ({ shopData }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { url: headboardImageUrl } = shopData.images.find(item => item.type === 'headboard')
  const { url: profileImageUrl } = shopData.images.find(item => item.type === 'profile')

  const handleHomeButton = () => {
    dispatch(filterChange({ mode: 'ALL' }))
    dispatch(deleteAllProducts())
    navigate('/')
  }

  return (
    <Box>
      <Box position="relative" height={['150px', '250px']}>
        <Tooltip label="Inicio">
          <IconButton
            icon={<Icon as={FaHome} />}
            position="absolute"
            marginTop={3}
            marginLeft={3}
            colorScheme="blackAlpha"
            onClick={handleHomeButton}
          />
        </Tooltip>
        <Image src={headboardImageUrl} alt="Headboard Image" objectFit="cover" width="full" maxHeight="full" />
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
        <ModalButton
          icon={<Icon as={FaQuestionCircle} />}
          buttonTooltipText="Ayuda"
          position="absolute"
          right="0"
          bottom="0"
          marginBottom={[4, 3]}
          marginRight={3}
          colorScheme="blackAlpha"
          modalTitle="Bienvenido a Tique"
          modalChildren={<HelpSteps />}
        />
      </Box>
      <Box position="relative" marginX={[4, 0]}>
        <Box display={{ md: 'flex' }}>
          <Avatar marginTop={['-10', '-5']} size="2xl" name="Dan Abrahmov" src={profileImageUrl} />
          <VStack alignItems="left" marginTop={[2]} marginLeft={[0, 2]}>
            <Heading as="h1" size="md">
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
