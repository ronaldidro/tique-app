import { Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Category from './Category'

const Categories = ({ categoriesData }) => {
  if (!categoriesData.length)
    return (
      <Text textAlign="center" fontWeight="bold" marginY={5}>
        No se encontraron productos
      </Text>
    )

  return categoriesData.map(category => <Category key={category.id} categoryData={category} />)
}

Categories.propTypes = {
  categoriesData: PropTypes.array
}

export default Categories
