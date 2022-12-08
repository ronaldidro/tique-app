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

export const productColumns = () =>
  useMemo(
    () => [
      { Header: 'Nombre', accessor: 'name' },
      { Header: 'Precio', accessor: 'price' },
      { Header: 'Descuento', accessor: 'discount' },
      { Header: 'Categoría', accessor: 'category' },
      { Header: 'Estado', accessor: 'status' },
      { Header: 'Acciones', accessor: 'actions' }
    ],
    []
  )
