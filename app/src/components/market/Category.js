import { Heading, SimpleGrid, VStack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Product from './Product'

const Category = ({ categoryData }) => (
  <VStack align="self-start" paddingY={5}>
    <Heading as="h2" fontSize="xl">
      {categoryData.description}
    </Heading>
    <SimpleGrid columns={[1, 2]} spacing={5} paddingTop={3} width="full" borderTop="1px" borderColor="blackAlpha.500">
      {categoryData.products.map(product => (
        <Product key={product.id} productData={product} />
      ))}
    </SimpleGrid>
  </VStack>
)

Category.propTypes = {
  categoryData: PropTypes.object
}

export default Category
