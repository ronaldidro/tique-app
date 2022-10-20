import { Divider, Heading, SimpleGrid, VStack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Product from './Product'

const ProductCategory = ({ productCategoryData }) => {
  return (
    <VStack align="self-start" marginY={4}>
      <Heading as="h2" size="sm">
        {productCategoryData.description}
      </Heading>
      <Divider />
      <SimpleGrid columns={[1, 2]} spacing={5} width="full">
        {productCategoryData.products.map(product => (
          <Product key={product.id} productData={product} />
        ))}
      </SimpleGrid>
    </VStack>
  )
}

ProductCategory.propTypes = {
  productCategoryData: PropTypes.object
}

export default ProductCategory
