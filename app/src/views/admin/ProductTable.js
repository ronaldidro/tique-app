import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

const ProductTable = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th isNumeric>Precio</Th>
            <Th isNumeric>% Descuento</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Mixto completo</Td>
            <Td>Jamón inglés, queso Edam y huevo a la plancha</Td>
            <Td isNumeric>S/ 13</Td>
            <Td isNumeric>0 %</Td>
            <Td isNumeric>Activo</Td>
            <Td isNumeric>Editar | Eliminar</Td>
          </Tr>
          <Tr>
            <Td>Romano</Td>
            <Td>Pan marmoleado con pollo, mayonesa, corazones de alcachofa y palta</Td>
            <Td isNumeric>S/ 23.5</Td>
            <Td isNumeric>0 %</Td>
            <Td isNumeric>Desactivado</Td>
            <Td isNumeric>Editar | Eliminar</Td>
          </Tr>
          <Tr>
            <Td>Caprese</Td>
            <Td>Queso mozarella, tomate, albahaca y aceite de oliva en pan pita</Td>
            <Td isNumeric>S/ 17.5</Td>
            <Td isNumeric>0 %</Td>
            <Td isNumeric>Activo</Td>
            <Td isNumeric>Editar | Eliminar</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable
