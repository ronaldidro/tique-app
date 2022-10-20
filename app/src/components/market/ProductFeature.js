import { Box, Checkbox, CheckboxGroup, HStack, Radio, RadioGroup, Tag, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const FeatureContent = ({ description, additional }) => (
  <Box>
    <Text fontSize="md">{description}</Text>
    {additional && <Text fontSize="xs">+ S/ {additional.toFixed(2)}</Text>}
  </Box>
)

const ProductFeature = ({ featureData }) => {
  return (
    <Box paddingY={4} borderBottom="1px" borderColor="gray.200">
      <Box display="flex" justifyContent="space-between" paddingBottom={2}>
        <Text fontWeight="bold">{featureData.description}</Text>
        <Tag colorScheme="orange">{featureData.required ? 'Requerido' : 'Opcional'}</Tag>
      </Box>
      {featureData.type === 'multiple' && (
        <CheckboxGroup colorScheme="green">
          <HStack spacing={8}>
            {featureData.options.map((option, index) => (
              <Checkbox key={index} value={option.description} size="lg" colorScheme="gray">
                <FeatureContent description={option.description} additional={option.additional} />
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>
      )}
      {featureData.type === 'single' && (
        <RadioGroup>
          <HStack spacing={8}>
            {featureData.options.map((option, index) => (
              <Radio key={index} name="features" value={option.description} size="lg" colorScheme="gray">
                <FeatureContent description={option.description} additional={option.additional} />
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
      )}
    </Box>
  )
}

ProductFeature.propTypes = {
  featureData: PropTypes.object
}

FeatureContent.propTypes = {
  description: PropTypes.string,
  additional: PropTypes.number
}

export default ProductFeature
