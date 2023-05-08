import { ButtonGroup, Flex, IconButton, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { BiFirstPage, BiLastPage } from 'react-icons/bi'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const TablePagination = ({
  pageIndex,
  pageOptions,
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount
}) => (
  <Flex alignItems="center" justifyContent="space-between" paddingX={6} paddingTop={5}>
    <Text fontWeight="semibold">
      Página {pageIndex + 1} de {pageOptions.length}
    </Text>
    <ButtonGroup colorScheme="blue" variant="outline">
      <IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage} icon={<BiFirstPage size="xs" />} />
      <IconButton onClick={() => previousPage()} disabled={!canPreviousPage} icon={<MdKeyboardArrowLeft size="xs" />} />
      <IconButton onClick={() => nextPage()} disabled={!canNextPage} icon={<MdKeyboardArrowRight size="xs" />} />
      <IconButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} icon={<BiLastPage size="xs" />} />
    </ButtonGroup>
  </Flex>
)

TablePagination.propTypes = {
  pageIndex: PropTypes.number,
  pageOptions: PropTypes.array,
  gotoPage: PropTypes.func,
  canPreviousPage: PropTypes.bool,
  previousPage: PropTypes.func,
  nextPage: PropTypes.func,
  canNextPage: PropTypes.bool,
  pageCount: PropTypes.number
}

export default TablePagination
