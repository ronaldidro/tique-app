import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const SearchField = ({ placeholder = 'Buscar', value, handleSearch, ...inputProps }) => (
  <InputGroup {...inputProps}>
    <InputLeftElement pointerEvents="none">
      <SearchIcon />
    </InputLeftElement>
    <Input placeholder={placeholder} value={value} onChange={handleSearch} />
  </InputGroup>
)

SearchField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleSearch: PropTypes.func
}

export default SearchField
