import { Box, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { filterChange } from '../../reducers/filterReducer'
import { getProducts } from '../../utils'
import SearchField from '../fields/SearchField'

const Filters = () => {
  const dispatch = useDispatch()

  const handleCategoryChange = ({ target }) =>
    dispatch(filterChange({ mode: target.value === '' ? 'ALL' : 'BY_CATEGORY', content: target.value }))

  const handleProductSearch = ({ target }) =>
    dispatch(filterChange({ mode: target.value === '' ? 'ALL' : 'BY_NAME', content: target.value }))

  return (
    <Box display={{ md: 'flex' }} marginY={2}>
      <SearchField
        placeholder="Buscar producto"
        handleSearch={handleProductSearch}
        width={['100%', '65%']}
        marginRight={[0, 2]}
        marginBottom={[2, 0]}
      />
      <Select placeholder="Categorías" width={['100%', '35%']} onChange={handleCategoryChange}>
        {getProducts().map(category => (
          <option key={category.id} value={category.id}>
            {category.description}
          </option>
        ))}
      </Select>
    </Box>
  )
}

Filters.propTypes = {
  categories: PropTypes.array
}

export default Filters
