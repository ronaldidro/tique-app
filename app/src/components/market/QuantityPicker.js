import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, HStack, IconButton } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const QuantityPicker = ({ value, setValue }) => (
  <HStack justifyContent="space-between" width="full" padding={2} border="1px" borderRadius="md" borderColor="gray.200">
    <IconButton icon={<MinusIcon boxSize={3} />} size="sm" onClick={() => setValue(value - 1 < 1 ? 1 : value - 1)} />
    <Box as="span" fontWeight="semibold">
      {value}
    </Box>
    <IconButton icon={<AddIcon boxSize={3} />} size="sm" onClick={() => setValue(value + 1)} />
  </HStack>
)

QuantityPicker.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired
}

export default QuantityPicker
