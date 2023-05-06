import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../../components/admin/ProductForm'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import { useCustomToast } from '../../hooks'
import { useGetCategoriesQuery } from '../../services/categories'
import { useGetProductQuery, usePatchProductMutation } from '../../services/products'
import { formatToSelectOptions, toastBase } from '../../utils'

const ProductEdit = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useCustomToast()
  const { data, isLoading: isGettingCategories } = useGetCategoriesQuery()
  const { data: product, isLoading } = useGetProductQuery(productId)
  const [patchProduct, { isLoading: isUpdating }] = usePatchProductMutation()
  const categories = data ? formatToSelectOptions(data) : []

  const goToProducts = () => navigate('/admin/productos')

  const handleUpdateProduct = async values => {
    try {
      const response = await patchProduct({ ...values, discount: values.discount / 100 })

      if (response.data.id) {
        goToProducts()
        showToast({
          ...toastBase,
          title: 'Éxito',
          description: `Producto ${response.data.name} actualizado correctamente`,
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo actualizar datos de producto', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
  }

  if (isGettingCategories || isLoading) return <CircularSpinner />

  return (
    <ProductForm
      title="Editar producto"
      initialValues={{ ...product, discount: product.discount * 100 }}
      loadingStatus={isUpdating}
      categoriesList={categories}
      handleSubmit={handleUpdateProduct}
      handleCancel={goToProducts}
    />
  )
}

export default ProductEdit
