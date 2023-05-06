import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionButtons from '../../components/admin/ActionButtons'
import CustomTable from '../../components/admin/CustomTable'
import StatusTag from '../../components/admin/StatusTag'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import { useCustomToast } from '../../hooks'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '../../services/categories'
import { toastBase } from '../../utils'
import { categoryColumns } from '../../utils/tables'

const CategoryTable = () => {
  const alertDialogRef = useRef()
  const navigate = useNavigate()
  const columns = categoryColumns()
  const { showToast } = useCustomToast()
  const { data, isLoading } = useGetCategoriesQuery()
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleDeleteCategory = async id => {
    try {
      const response = await deleteCategory(id)

      if (response.data.id) {
        showToast({
          ...toastBase,
          title: 'Éxito',
          description: `Categoría ${response.data.description} eliminada correctamente`,
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo eliminar categoría', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
    alertDialogRef.current.closeAlert()
  }

  const formatData = resources =>
    resources.map(data => ({
      ...data,
      productsNumber: data.products.length,
      status: <StatusTag active={data.active} />,
      actions: (
        <ActionButtons
          alertTitle="Eliminar Categoría"
          alertContent={`¿Está seguro de eliminar ${data.description}?`}
          handleEditButton={() => navigate(`/admin/categorias/editar/${data.id}`)}
          handleDeleteButton={() => handleDeleteCategory(data.id)}
          alertRef={alertDialogRef}
        />
      )
    }))

  const categories = data ? formatData(data) : []

  if (isLoading) return <CircularSpinner />

  return (
    <CustomTable
      title="Categorías"
      columns={columns}
      data={categories}
      handleAddButton={() => navigate('/admin/categorias/agregar')}
    />
  )
}

export default CategoryTable
