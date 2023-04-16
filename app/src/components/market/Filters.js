import { Box, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../../reducers/filterReducer'
import { getProducts } from '../../utils'
import SearchField from '../fields/SearchField'

const Filters = () => {
  const { mode, content } = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleCategoryChange = ({ target }) =>
    dispatch(filterChange({ mode: target.value === '' ? 'ALL' : 'BY_CATEGORY', content: target.value }))

  const handleProductSearch = ({ target }) =>
    dispatch(filterChange({ mode: target.value === '' ? 'ALL' : 'BY_NAME', content: target.value }))

  return (
    <Box display={{ md: 'flex' }} marginY={2}>
      <SearchField
        placeholder="Buscar producto"
        value={mode === 'BY_NAME' ? content : ''}
        handleSearch={handleProductSearch}
        width={['100%', '65%']}
        marginRight={[0, 2]}
        marginBottom={[2, 0]}
      />
      <Select
        placeholder="Todas las categorías"
        onChange={handleCategoryChange}
        value={mode === 'BY_CATEGORY' ? content : ''}
        width={['100%', '35%']}
      >
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
