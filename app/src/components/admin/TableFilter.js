import { useAsyncDebounce } from 'react-table'
import PropTypes from 'prop-types'
import SearchField from '../fields/SearchField'

const TableFilter = ({ setGlobalFilter }) => {
  const onFilterChange = useAsyncDebounce(value => setGlobalFilter(value || undefined), 200)
  const handleInputChange = e => onFilterChange(e.target.value)

  return <SearchField handleSearch={handleInputChange} maxWidth={['full', 'xs']} />
}

TableFilter.propTypes = {
  setGlobalFilter: PropTypes.func
}

export default TableFilter
