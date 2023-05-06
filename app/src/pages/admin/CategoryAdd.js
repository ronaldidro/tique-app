import { useNavigate } from 'react-router-dom'
import CategoryForm from '../../components/admin/CategoryForm'
import { useCustomToast } from '../../hooks'
import { usePostCategoryMutation } from '../../services/categories'
import { toastBase } from '../../utils'

const CategoryAdd = () => {
  const navigate = useNavigate()
  const { showToast } = useCustomToast()
  const [postCategory, { isLoading: isAdding }] = usePostCategoryMutation()

  const goToCategories = () => navigate('/admin/categorias')

  const handleAddCategory = async values => {
    try {
      const response = await postCategory(values)

      if (response.data.id) {
        goToCategories()
        showToast({
          ...toastBase,
          title: 'Éxito',
          description: `Categoría ${response.data.description} creada correctamente`,
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo crear categoría', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
  }

  return (
    <CategoryForm
      title="Agregar categoría"
      initialValues={{ description: '', active: true }}
      loadingStatus={isAdding}
      handleSubmit={handleAddCategory}
      handleCancel={goToCategories}
    />
  )
}

export default CategoryAdd
