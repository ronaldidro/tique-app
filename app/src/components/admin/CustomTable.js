import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table'
import TableFilter from './TableFilter'
import TablePagination from './TablePagination'

const CustomTable = ({ title, columns, data, defaultPageSize = 5, handleAddButton }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    { columns, data, initialState: { pageSize: defaultPageSize, pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <TableContainer backgroundColor="white" rounded="md" paddingY={5}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={6}
        paddingBottom={5}
        borderBottomWidth="1px"
      >
        <Heading as="h1" size="md" fontSize={{ base: '2xl', sm: '3xl' }} paddingBottom={[2, 0]}>
          {title}
        </Heading>
        <Button rightIcon={<AddIcon />} colorScheme="blue" variant="outline" onClick={handleAddButton}>
          Agregar
        </Button>
      </Box>
      {data.length > defaultPageSize && (
        <Box
          display={{ base: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
          paddingX={6}
          paddingY={5}
        >
          <Select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            maxWidth={['full', '36']}
            marginBottom={[4, 0]}
          >
            {[5, 10, 15, data.length].map((pageSize, index) => (
              <option key={index} value={pageSize}>
                {pageSize !== data.length ? `Mostrar ${pageSize}` : 'Mostrar todo'}
              </option>
            ))}
          </Select>
          <TableFilter setGlobalFilter={setGlobalFilter} />
        </Box>
      )}
      <Table {...getTableProps()}>
        <Thead backgroundColor="gray.50">
          {headerGroups.map((headerGroup, index) => (
            <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <Th key={index} {...column.getHeaderProps(column.getSortByToggleProps())} textAlign="center">
                  {column.render('Header')}
                  {column.isSorted && (column.isSortedDesc ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row)
            return (
              <Tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <Td key={index} {...cell.getCellProps()} textAlign="center">
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      {pageOptions.length > 1 && (
        <TablePagination
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </TableContainer>
  )
}

CustomTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  defaultPageSize: PropTypes.number,
  handleAddButton: PropTypes.func
}

export default CustomTable
