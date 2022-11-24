import { Box, HStack, IconButton, Text } from '@chakra-ui/react'
import { BiFirstPage, BiLastPage } from 'react-icons/bi'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import PropTypes from 'prop-types'

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
  <Box
    display={{ base: 'block', md: 'flex' }}
    alignItems="center"
    justifyContent="space-between"
    paddingX={6}
    paddingTop={5}
  >
    <Text fontWeight="semibold" paddingBottom={[4, 0]}>
      Página {pageIndex + 1} de {pageOptions.length}
    </Text>
    <HStack>
      <IconButton
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        icon={<BiFirstPage size="xs" />}
        colorScheme="teal"
        variant="outline"
      />
      <IconButton
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        icon={<MdKeyboardArrowLeft size="xs" />}
        colorScheme="teal"
        variant="outline"
      />
      <IconButton
        onClick={() => nextPage()}
        disabled={!canNextPage}
        icon={<MdKeyboardArrowRight size="xs" />}
        colorScheme="teal"
        variant="outline"
      />
      <IconButton
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
        icon={<BiLastPage size="xs" />}
        colorScheme="teal"
        variant="outline"
      />
    </HStack>
  </Box>
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
