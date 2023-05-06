import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionButtons from '../../components/admin/ActionButtons'
import CustomTable from '../../components/admin/CustomTable'
import StatusTag from '../../components/admin/StatusTag'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import { useCustomToast } from '../../hooks'
import { useDeleteProductMutation, useGetProductsQuery } from '../../services/products'
import { formatPrice, toastBase } from '../../utils'
import { productColumns } from '../../utils/tables'

const ProductTable = () => {
  const alertDialogRef = useRef()
  const navigate = useNavigate()
  const columns = productColumns()
  const { showToast } = useCustomToast()
  const { data, isLoading } = useGetProductsQuery()
  const [deleteProduct] = useDeleteProductMutation()

  const handleDeleteProduct = async id => {
    try {
      const response = await deleteProduct(id)

      if (response.data.id) {
        showToast({
          ...toastBase,
          title: 'Éxito',
          description: `Producto ${response.data.name} eliminado correctamente`,
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo eliminar producto', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
    alertDialogRef.current.closeAlert()
  }

  const formatData = resources =>
    resources.map(data => ({
      ...data,
      price: formatPrice(data.price),
      discount: `${(data.discount * 100).toFixed(2)} %`,
      category: data.category.description,
      status: <StatusTag active={data.active} />,
      actions: (
        <ActionButtons
          alertTitle="Eliminar Producto"
          alertContent={`¿Está seguro de eliminar ${data.name}?`}
          handleEditButton={() => navigate(`/admin/productos/editar/${data.id}`)}
          handleDeleteButton={() => handleDeleteProduct(data.id)}
          alertRef={alertDialogRef}
        />
      )
    }))

  const products = data ? formatData(data) : []

  if (isLoading) return <CircularSpinner />

  return (
    <CustomTable
      title="Productos"
      columns={columns}
      data={products}
      handleAddButton={() => navigate('/admin/productos/agregar')}
    />
  )
}

export default ProductTable
