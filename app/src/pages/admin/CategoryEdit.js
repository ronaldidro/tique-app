import { useNavigate, useParams } from 'react-router-dom'
import CategoryForm from '../../components/admin/CategoryForm'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import { useCustomToast } from '../../hooks'
import { useGetCategoryQuery, usePatchCategoryMutation } from '../../services/categories'
import { toastBase } from '../../utils'

const CategoryEdit = () => {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useCustomToast()
  const { data: category, isLoading } = useGetCategoryQuery(categoryId)
  const [patchCategory, { isLoading: isUpdating }] = usePatchCategoryMutation()

  const goToCategories = () => navigate('/admin/categorias')

  const handleUpdateCategory = async values => {
    try {
      const response = await patchCategory(values)

      if (response.data.id) {
        goToCategories()
        showToast({
          ...toastBase,
          title: 'Éxito',
          description: `Categoría ${response.data.description} actualizada correctamente`,
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo actualizar datos de categoría', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
  }

  if (isLoading) return <CircularSpinner />

  return (
    <CategoryForm
      title="Editar categoría"
      initialValues={category}
      loadingStatus={isUpdating}
      handleSubmit={handleUpdateCategory}
      handleCancel={goToCategories}
    />
  )
}

export default CategoryEdit
