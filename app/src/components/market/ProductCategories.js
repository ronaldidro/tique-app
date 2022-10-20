import { Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ProductCategory from './ProductCategory'

const ProductCategories = ({ productCategoriesData }) => {
  if (!productCategoriesData.length)
    return (
      <Text textAlign="center" fontWeight="bold" marginY={5}>
        No se encontraron productos
      </Text>
    )

  return productCategoriesData.map(productCategory => (
    <ProductCategory key={productCategory.id} productCategoryData={productCategory} />
  ))
}

ProductCategories.propTypes = {
  productCategoriesData: PropTypes.array
}

export default ProductCategories
