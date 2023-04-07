import { useNavigate } from 'react-router-dom'
import { Box, Heading, HStack, Icon, Image, Text } from '@chakra-ui/react'
import { FcEmptyFilter, FcShop } from 'react-icons/fc'
import PropTypes from 'prop-types'

const CompanyCard = ({ companyData }) => {
  const navigate = useNavigate()
  const { url: initialImageUrl } = companyData.images.find(item => item.type === 'initial')

  return (
    <Box
      shadow="md"
      borderWidth="1px"
      borderRadius="xl"
      cursor="pointer"
      onClick={() => navigate(`tienda/${companyData.id}`)}
    >
      <Image borderTopRadius="xl" src={initialImageUrl} alt="Dan Abramov" />
      <Box padding={3}>
        <Heading size="md" paddingBottom={[0, 2]} textAlign={['center', 'left']}>
          {companyData.name}
        </Heading>
        <Box display={['none', 'block']}>
          <HStack paddingBottom={2}>
            <Icon as={FcShop} />
            <Text noOfLines={2}>{companyData.address}</Text>
          </HStack>
          <HStack>
            <Icon as={FcEmptyFilter} />
            <Text noOfLines={2}>{companyData.placeService}</Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}

CompanyCard.propTypes = {
  companyData: PropTypes.object
}

export default CompanyCard
