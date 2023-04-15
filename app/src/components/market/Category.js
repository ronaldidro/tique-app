import { Divider, Heading, SimpleGrid, VStack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Product from './Product'

const Category = ({ categoryData }) => (
  <VStack align="self-start" marginY={4}>
    <Heading as="h2" size="sm">
      {categoryData.description}
    </Heading>
    <Divider />
    <SimpleGrid columns={[1, 2]} spacing={5} width="full">
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
