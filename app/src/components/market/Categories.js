import PropTypes from 'prop-types'
import Category from './Category'

const Categories = ({ categoriesData }) =>
  categoriesData.map(category => <Category key={category.id} categoryData={category} />)

Categories.propTypes = {
  categoriesData: PropTypes.array
}

export default Categories
