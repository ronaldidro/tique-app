import { useMemo } from 'react'

export const categoryColumns = () =>
  useMemo(
    () => [
      { Header: 'Descripción', accessor: 'description' },
      { Header: 'Nro. Productos', accessor: 'productsNumber' },
      { Header: 'Estado', accessor: 'status' },
      { Header: 'Acciones', accessor: 'actions' }
    ],
    []
  )
