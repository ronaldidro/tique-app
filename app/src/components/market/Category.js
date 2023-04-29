import { SimpleGrid } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ProductCard from './ProductCard'

const Category = ({ categoryData }) => (
  <SimpleGrid columns={{ base: 2, md: 4 }} columnGap={{ base: 4, md: 6 }} rowGap={{ base: 8, md: 10 }} width="full">
    {categoryData.products.map(product => (
      <ProductCard key={product.id} productData={product} />
    ))}
  </SimpleGrid>
)

Category.propTypes = {
  categoryData: PropTypes.object
}

export default Category
