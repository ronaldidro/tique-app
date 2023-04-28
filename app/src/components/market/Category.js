import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ProductCard from './ProductCard'

const Category = ({ categoryData }) => (
  <Box paddingY={5}>
    <Heading as="h2" fontSize="xl">
      {categoryData.description}
    </Heading>
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      columnGap={{ base: 4, md: 6 }}
      rowGap={{ base: 8, md: 10 }}
      paddingTop={3}
      width="full"
      borderTop="1px"
      borderColor="blackAlpha.500"
    >
      {categoryData.products.map(product => (
        <ProductCard key={product.id} productData={product} />
      ))}
    </SimpleGrid>
  </Box>
)

Category.propTypes = {
  categoryData: PropTypes.object
}

export default Category
