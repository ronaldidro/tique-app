import { Box, Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { FaHome, FaMapPin } from 'react-icons/fa'
import PropTypes from 'prop-types'

const AttentionSchedule = ({ attentionDays, address, placeService }) => {
  return (
    <Box>
      <Box paddingY={2}>
        {attentionDays.map((item, index) => (
          <Flex key={index} justifyContent="space-between" paddingBottom={2}>
            <Text>{item.day}</Text>
            <Text>{item.schedule}</Text>
          </Flex>
        ))}
      </Box>
      <HStack paddingBottom={2}>
        <Icon as={FaHome} />
        <Text>{address}</Text>
      </HStack>
      <HStack>
        <Icon as={FaMapPin} />
        <Text>{placeService}</Text>
      </HStack>
    </Box>
  )
}

AttentionSchedule.propTypes = {
  attentionDays: PropTypes.array,
  address: PropTypes.string,
  placeService: PropTypes.string
}

export default AttentionSchedule
