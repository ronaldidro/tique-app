import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const SearchField = ({ placeholder = 'Buscar', handleSearch, ...inputProps }) => {
  return (
    <InputGroup {...inputProps}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input placeholder={placeholder} onChange={handleSearch} />
    </InputGroup>
  )
}

SearchField.propTypes = {
  placeholder: PropTypes.string,
  handleSearch: PropTypes.func
}

export default SearchField
