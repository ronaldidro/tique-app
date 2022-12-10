import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Heading, Icon, IconButton, Image, Link, Stack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { FaHome, FaCalendarDay } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { filterChange } from '../../reducers/filterReducer'
import { deleteAllProducts } from '../../reducers/productsOrderReducer'
import { socialNetworkIcons } from '../../utils'
import AttentionSchedule from './AttentionSchedule'
import ModalButton from './ModalButton'

const Header = ({ companyData }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { url: headboardImageUrl } = companyData.images.find(item => item.type === 'headboard')
  const { url: profileImageUrl } = companyData.images.find(item => item.type === 'profile')

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
            colorScheme="whiteAlpha"
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
          colorScheme="whiteAlpha"
          modalTitle="Horarios de Atención"
          modalChildren={
            <AttentionSchedule
              attentionDays={companyData.attentionSchedule}
              address={companyData.address}
              placeService={companyData.placeService}
            />
          }
        />
      </Box>
      <Box position="relative" marginX={[4, 0]}>
        <Box display={{ md: 'flex' }}>
          <Avatar marginTop={['-10', '-5']} size="2xl" name="Dan Abrahmov" src={profileImageUrl} />
          <VStack alignItems="left" marginTop={[2]} marginLeft={[0, 2]}>
            <Heading as="h1" size="md">
              {companyData.name}
            </Heading>
            <Text width={['full', '3xl']} textAlign={['justify', 'left']}>
              {companyData.description}
            </Text>
            <Text>{companyData.address}</Text>
          </VStack>
        </Box>
        <Box position="absolute" top="0" right="0" marginY={[4, 8]}>
          <Stack direction="row">
            {companyData.socialNetworks.map(({ type, url }, index) => (
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
  companyData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default Header
